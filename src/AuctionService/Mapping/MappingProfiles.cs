using AuctionService.DTO;
using AuctionService.Entities;

using AutoMapper;

namespace AuctionService.Mapping;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);

    CreateMap<Item, AuctionDto>();
  }
}
