using AuctionService;

using BiddingService.Entities;

using Grpc.Net.Client;

namespace BiddingService.Services;

public class GrpcAuctionClient
{
  private readonly IConfiguration _configuration;
  private readonly ILogger<GrpcAuctionClient> _logger;

  public GrpcAuctionClient(IConfiguration configuration, ILogger<GrpcAuctionClient> logger)
  {
    _configuration = configuration;
    _logger = logger;
  }

  public Auction? GetAuction(string auctionId)
  {
    _logger.LogInformation("Calling Grpc Service");

    var channel = GrpcChannel.ForAddress(_configuration["GrpcAuction"]!);

    var client = new GrpcAuction.GrpcAuctionClient(channel);

    var request = new GetAuctionRequest{Id = auctionId};

    try
    {
      var reply = client.GetAuction(request);
      var auction = new Auction
      {
          ID = reply.Auction.Id,
          AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
          Seller = reply.Auction.Seller,
          ReservePrice = reply.Auction.ReservePrice
      };

      return auction;
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Could not call GRPC Server");
      return null;
    }
  }
}
