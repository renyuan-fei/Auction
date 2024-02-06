using AuctionService.Data;

using Grpc.Core;

namespace AuctionService.Services;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
  private readonly AuctionDbContext _auctionDbContext;
  public GrpcAuctionService(AuctionDbContext auctionDbContext)
  {
    _auctionDbContext = auctionDbContext;
  }

  public async override Task<GrpcAuctionResponse> GetAuction(
      GetAuctionRequest request,
      ServerCallContext context)
  {
    Console.WriteLine("===> Received Grpc request for auction");

    var auction = await _auctionDbContext.Auctions.FindAsync(Guid.Parse(request.Id));

    if (auction == null)
    {
      throw new RpcException(new Status(StatusCode.NotFound, "Auction not found"));
    }

    var response = new GrpcAuctionResponse
    {
        Auction = new GrpcAuctionModel
        {
            AuctionEnd = auction.AuctionEnd.ToString(),
            Id = auction.Id.ToString(),
            ReservePrice = auction.ReservePrice,
            Seller = auction.Seller
        }
    };

    return response;
  }
}
