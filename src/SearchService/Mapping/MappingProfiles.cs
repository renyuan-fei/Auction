using AutoMapper;

using Contracts;

using SearchService.Entities;

namespace SearchService.Mapping;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<AuctionCreated, Item>();
    CreateMap<AuctionUpdated, Item>();
  }
}
