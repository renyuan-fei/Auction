using AuctionService.Consumers;
using AuctionService.Data;
using AuctionService.Services;

using MassTransit;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Npgsql;

using Polly;

namespace AuctionService;

// ReSharper disable once ClassNeverInstantiated.Global
public class Program
{
  public static void Main(string[ ] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddAuctionServices(builder.Configuration);
    builder.Services.AddControllers();

    builder.Services.AddMassTransit(x =>
    {
      // Configure Entity Framework Outbox. This is used for storing messages
      // in the database before they are published to the message broker.
      x.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
      {
        // Set the delay for querying the Outbox for pending messages.
        o.QueryDelay = TimeSpan.FromSeconds(10);

        // Specify that PostgreSQL is used as the database for the Outbox.
        o.UsePostgres();

        // Enable the use of the bus outbox which ensures message consistency.
        o.UseBusOutbox();
      });

      // Automatically discovers and adds consumers (message handlers) in the
      // specified namespace to MassTransit for dependency injection.
      x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();

      // Sets the naming convention for endpoints in MassTransit.
      // Kebab-case format is used with a prefix "auction".
      x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction", false));

      // Configures RabbitMQ as the message broker for MassTransit.
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

        // Automatically configures endpoints for the discovered consumers.
        cfg.ConfigureEndpoints(context);
      });
    });

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
             options.Authority = builder.Configuration["IdentityServiceUrl"];
             options.RequireHttpsMetadata = false;
             options.TokenValidationParameters.ValidateAudience = false;
             options.TokenValidationParameters.NameClaimType = "username";
           });

    var app = builder.Build();

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();
    app.MapGrpcService<GrpcAuctionService>();

    var retryPolicy = Policy
                      .Handle<NpgsqlException>()
                      .WaitAndRetry(5,retryCount => TimeSpan.FromSeconds(10));

    retryPolicy.ExecuteAndCapture(() => DbInitializer.InitDb(app));

    try { DbInitializer.InitDb(app); }
    catch (Exception e)
    {
      Console.WriteLine(e);

      throw;
    }

    app.Run();
  }
}
