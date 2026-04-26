using Microsoft.EntityFrameworkCore;

namespace Rank.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<RankModel> Ranks { get; set; }
    }
}