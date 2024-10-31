using FondChecker.Models;
using Microsoft.EntityFrameworkCore;

namespace FondChecker.Data
{
    public class FondContext:DbContext
    {

        public FondContext(DbContextOptions<FondContext> opcije) : base(opcije)
        { 
        
        }

        public DbSet<Fond> Fond { get; set; }
    }
}
