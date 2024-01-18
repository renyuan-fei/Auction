using AuctionService.Data;
using AuctionService.Interface;

using Microsoft.EntityFrameworkCore;

namespace AuctionService;

public static class DependenceInjection
{
  public static IServiceCollection AddAuctionServices(
      this IServiceCollection services,
      IConfiguration          configuration
      )
  {
    services.AddDbContext<AuctionDbContext>(options =>
                                                options.UseNpgsql(configuration
                                                    .GetConnectionString("DefaultConnection")));

    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    services.AddScoped<IAuctionRepository, AuctionRepository>();


    return services;
  }
}
