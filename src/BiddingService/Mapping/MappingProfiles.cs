using AutoMapper;

using BiddingService.DTO;
using BiddingService.Entities;

using Contracts;

namespace BiddingService.Mapping;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<Bid, BidDto>();
    CreateMap<Bid, BidPlaced>();
  }
}
