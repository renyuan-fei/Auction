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

  public async Task<List<Item>?> GetItemsForSearchDbAsync()
  {
    var lastUpdatedResult = await DB.Find<Item, string>()
                                    .Sort(x => x.Descending(x => x.UpdatedAt))
                                    .Project(x => x.UpdatedAt.ToString())
                                    .ExecuteFirstAsync();

    // 如果 lastUpdatedResult 为 null，则使用 DateTime.MinValue
    var lastUpdated = lastUpdatedResult != null
        ? DateTime.Parse(lastUpdatedResult)
        : DateTime.MinValue;

    return await _client.GetFromJsonAsync<List<Item>>(_configuration["AuctionServiceUrl"]
                                                    + "/api/auctions?date="
                                                    + lastUpdated);
  }
}
