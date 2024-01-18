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

  [HttpPost]
  public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
  {
    var auction = _mapper.Map<Auction>(auctionDto);

    auction.Seller = "Test User";

    _auctionRepository.AddAuction(auction);

    var newAuction = _mapper.Map<AuctionDto>(auction);

    var result = await _auctionRepository.SaveChangesAsync();

    if (!result) return BadRequest("Could not save changes to the DB");

    return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
  {
    var auction = await _auctionRepository.GetAuctionEntityById(id);

    if (auction == null) return NotFound();

    auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
    auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
    auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
    auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
    auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;


    var result = await _auctionRepository.SaveChangesAsync();

    if (result) return Ok();

    return BadRequest("Problem saving changes");
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAuction(Guid id)
  {
    var auction = await _auctionRepository.GetAuctionEntityById(id);

    if (auction == null) return NotFound();

    _auctionRepository.RemoveAuction(auction);

    var result = await _auctionRepository.SaveChangesAsync();

    if (!result) return BadRequest("Could not update DB");

    return Ok();
  }
}
