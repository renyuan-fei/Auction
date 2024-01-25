using System.Diagnostics.CodeAnalysis;

using MongoDB.Driver;
using MongoDB.Entities;

using SearchService.Data;
using SearchService.Entities;
using SearchService.Services;

namespace SearchService;

public class Program
{
  public static void Main(string[ ] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllers();
    builder.Services.AddHttpClient<AuctionSvcHttpClient>();

    var app = builder.Build();

    app.UseAuthorization();

    app.MapControllers();

    try
    {
      DbInitializer.InitDb(app).Wait();
    }
    catch (Exception e)
    {
      Console.WriteLine(e);

      throw;
    }

    app.Run();
  }
}
