using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AuctionService.DTO;
using AuctionService.Entities;
using AuctionService.Interface;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Controllers;

[ Route("api/[controller]") ]
[ ApiController ]
public class AuctionsController : ControllerBase
{
  private readonly IAuctionRepository _auctionRepository;
  private readonly IMapper            _mapper;

  public AuctionsController(IMapper mapper, IAuctionRepository auctionRepository)
  {
    _mapper = mapper;
    _auctionRepository = auctionRepository;
  }

  [ HttpGet ]
  public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
  {
    return await _auctionRepository.GetAuctionsAsync();
  }

  [ HttpGet("{id}") ]
  public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
  {
    var auction = await _auctionRepository.GetAuctionByIdAsync(id);

    if (auction == null) return NotFound();

    return auction;
  }
}
