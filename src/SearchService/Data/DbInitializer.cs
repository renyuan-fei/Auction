using MongoDB.Driver;
using MongoDB.Entities;

using SearchService.Entities;
using SearchService.Services;

namespace SearchService.Data;

public static class DbInitializer
{
  public async static Task InitDb(WebApplication app)
  {
    var connectionString = app.Configuration.GetConnectionString("MongoDbConnection")!;

    await DB.InitAsync("SearchDb",
                       MongoClientSettings.FromConnectionString(connectionString));

    await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();

    var count = await DB.CountAsync<Item>();

    using var scope = app.Services.CreateScope();

    var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

    var items = await httpClient.GetItemsForSearchDbAsync();

    Console.WriteLine(items!.Count + " returned from the auction service");

    if (items.Count > 0) await DB.SaveAsync(items);

    // if (count == 0)
    // {
    //   Console.WriteLine("No data - will attempt to seed");
    //   var itemData = await File.ReadAllTextAsync("Data/auctions.json");
    //
    //   var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};
    //
    //   var item = JsonSerializer.Deserialize<List<Item>>(itemData, options);
    //
    //   await DB.InsertAsync(item);
    // }
  }
}
