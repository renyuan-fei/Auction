using BiddingService.Consumers;
using BiddingService.Services;

using MassTransit;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using MongoDB.Driver;
using MongoDB.Entities;


namespace BiddingService;

public class Program
{
  public static void Main(string[ ] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllers();
    builder.Services.AddMassTransit(x =>
    {
      x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

      x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

      x.UsingRabbitMq((context, cfg) =>
      {
        cfg.UseMessageRetry(r =>
        {
          r.Handle<RabbitMqConnectionException>();
          r.Interval(5, TimeSpan.FromSeconds(10));
        });

        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
          host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
          host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });

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

    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    builder.Services.AddHostedService<CheckAuctionFinished>();

    builder.Services.AddScoped<GrpcAuctionClient>();

    var app = builder.Build();

    app.UseAuthorization();

    app.MapControllers();

    DB.InitAsync("BidDb", MongoClientSettings.FromConnectionString(builder
        .Configuration.GetConnectionString("BidDbConnection"))).Wait();

    app.Run();
  }
}
