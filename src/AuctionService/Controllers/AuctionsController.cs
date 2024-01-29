using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AuctionService.DTO;
using AuctionService.Entities;
using AuctionService.Interface;

using AutoMapper;

using Contracts;

using MassTransit;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Controllers;

[ Route("api/[controller]") ]
[ ApiController ]
public class AuctionsController : ControllerBase
{
  private readonly IPublishEndpoint   _publishEndpoint;
  private readonly IAuctionRepository _auctionRepository;
  private readonly IMapper            _mapper;

  public AuctionsController(
      IMapper            mapper,
      IAuctionRepository auctionRepository,
      IPublishEndpoint   publishEndpoint)
  {
    _mapper = mapper;
    _auctionRepository = auctionRepository;
    _publishEndpoint = publishEndpoint;
  }

  [ HttpGet ]
  public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
  {
    return await _auctionRepository.GetAuctionsAsync(date);
  }

  [ HttpGet("{id}") ]
  public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
  {
    var auction = await _auctionRepository.GetAuctionByIdAsync(id);

    if (auction == null) return NotFound();

    return auction;
  }

  [Authorize]
  [ HttpPost ]
  public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
  {
    var auction = _mapper.Map<Auction>(auctionDto);

    auction.Seller = User.Identity!.Name!;

    _auctionRepository.AddAuction(auction);

    var newAuction = _mapper.Map<AuctionDto>(auction);

    await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

    var result = await _auctionRepository.SaveChangesAsync();

    if (!result) return BadRequest("Could not save changes to the DB");

    return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
  }

  [Authorize]
  [ HttpPut("{id}") ]
  public async Task<ActionResult> UpdateAuction(
      Guid             id,
      UpdateAuctionDto updateAuctionDto)
  {
    var auction = await _auctionRepository.GetAuctionEntityById(id);

    if (auction == null) return NotFound();

    if (auction.Seller != User.Identity!.Name!) return Forbid();
    
    auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
    auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
    auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
    auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
    auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

    await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

    var result = await _auctionRepository.SaveChangesAsync();

    if (result) return Ok();

    return BadRequest("Problem saving changes");
  }
  
  [Authorize]
  [ HttpDelete("{id}") ]
  public async Task<ActionResult> DeleteAuction(Guid id)
  {
    var auction = await _auctionRepository.GetAuctionEntityById(id);

    if (auction == null) return NotFound();

    _auctionRepository.RemoveAuction(auction);

    await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

    var result = await _auctionRepository.SaveChangesAsync();

    if (!result) return BadRequest("Could not update DB");

    return Ok();
  }
}
