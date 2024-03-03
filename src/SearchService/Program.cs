using System.Net;

using MassTransit;

using Polly;
using Polly.Extensions.Http;

using SearchService.Consumers;
using SearchService.Data;
using SearchService.Services;

namespace SearchService;

// ReSharper disable once ClassNeverInstantiated.Global
public class Program
{
  public static void Main(string[ ] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddSearchServices(builder.Configuration);
    // Add services to the container.

    builder.Services.AddControllers();
    builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());

    builder.Services.AddMassTransit(x =>
    {
      x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

      x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

      x.UsingRabbitMq((context, cfg) =>
      {
        cfg.UseMessageRetry(r =>
        {
          r.Handle<RabbitMqConnectionException>();
          r.Interval(5, TimeSpan.FromSeconds(10));
        });

        cfg.Host(builder.Configuration["RabbitMq:Host"],
                 "/",
                 host =>
                 {
                   host.Username(builder.Configuration.GetValue("RabbitMq:Username",
                                   "guest"));

                   host.Password(builder.Configuration.GetValue("RabbitMq:Password",
                                   "guest"));
                 });

        cfg.ReceiveEndpoint("search-auction-created",
                            e =>
                            {
                              e.UseMessageRetry(r => r.Interval(5, 5));

                              e.ConfigureConsumer<AuctionCreatedConsumer>(context);
                            });

        cfg.ConfigureEndpoints(context);
      });
    });

    var app = builder.Build();

    app.UseAuthorization();

    app.MapControllers();

    app.Lifetime.ApplicationStarted.Register(async () =>
    {
      await Policy.Handle<TimeoutException>()
                  .WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(10))
                  .ExecuteAndCaptureAsync(async () => await DbInitializer.InitDb(app));
    });

    app.Run();
  }

  private static IAsyncPolicy<HttpResponseMessage> GetPolicy()
  {
    return HttpPolicyExtensions
           .HandleTransientHttpError()
           .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
           .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
  }
}
