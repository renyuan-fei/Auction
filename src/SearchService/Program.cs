using System.Diagnostics.CodeAnalysis;

using MassTransit;

using MongoDB.Driver;
using MongoDB.Entities;

using Polly;
using Polly.Extensions.Http;

using SearchService.Consumers;
using SearchService.Data;
using SearchService.Entities;
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
        cfg.ConfigureEndpoints(context);
      });
    });

    var app = builder.Build();

    app.UseAuthorization();

    app.MapControllers();

    try { DbInitializer.InitDb(app).Wait(); }
    catch (Exception e)
    {
      Console.WriteLine(e);

      throw;
    }

    app.Run();
  }

  private static IAsyncPolicy<HttpResponseMessage> GetPolicy() =>
      HttpPolicyExtensions
          .HandleTransientHttpError()
          .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
          .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
}