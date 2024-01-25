using System.Globalization;

using MongoDB.Entities;

using SearchService.Entities;

namespace SearchService.Services;

public class AuctionSvcHttpClient
{
  private readonly HttpClient     _client;
  private readonly IConfiguration _configuration;

  public AuctionSvcHttpClient(HttpClient client, IConfiguration configuration)
  {
    _client = client;
    _configuration = configuration;
  }

  public async Task<List<Item>?> GetItemsForSearchDbAsync(string searchTerm)
  {
    var lastUpdated = await DB.Find<Item, string>()
                              .Sort(x => x.Descending(item => item.UpdatedAt))
                              .Project(item =>
                                           item.UpdatedAt.ToString(CultureInfo
                                               .InvariantCulture))
                              .ExecuteFirstAsync();

    return await _client.GetFromJsonAsync<List<Item>>(_configuration["AuctionServiceUrl"]
                                                    + "/api/auctions?date="
                                                    + lastUpdated);
  }
}
