using AuctionService.Entities;

using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class AuctionDbContext : DbContext
{
  public AuctionDbContext(DbContextOptions<AuctionDbContext> options) : base(options)
  {

  }

  public DbSet<Auction?> Auctions { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    // // 配置 Auction 和 Item 之间的一对一关系
    modelBuilder.Entity<Auction>()
                .HasOne(a => a.Item)
                .WithOne(i => i.Auction)
                .HasForeignKey<Item>(i => i.AuctionId); // 指定 Item.AuctionId 作为外键
  }
}
