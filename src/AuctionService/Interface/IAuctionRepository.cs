using AuctionService.DTO;
using AuctionService.Entities;

namespace AuctionService.Interface;

public interface IAuctionRepository
{
  Task<List<AuctionDto>> GetAuctionsAsync(string? date);

  Task<AuctionDto?> GetAuctionByIdAsync(Guid id);

  Task<Auction?> GetAuctionEntityById(Guid id);

  void AddAuction(Auction? auction);

  void RemoveAuction(Auction? auction);

  Task<bool> SaveChangesAsync();
}
