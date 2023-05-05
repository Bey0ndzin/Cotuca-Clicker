using Microsoft.EntityFrameworkCore;
using CotucaClickerAPI.Models;
using System.Diagnostics.CodeAnalysis;

namespace CotucaClickerAPI.Data
{
    public class GameContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public GameContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }
        public DbSet<Player>? Player { get; set; }
    }
}