using MongoDB.Driver;
using MongoDB.Entities;

namespace SearchService;

public static class DependenceInjection
{
  public static IServiceCollection AddSearchServices(
      this IServiceCollection services,
      IConfiguration          configuration
      )
  {
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    return services;
  }
}
