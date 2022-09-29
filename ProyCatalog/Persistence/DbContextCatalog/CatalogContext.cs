using Microsoft.EntityFrameworkCore;
using ProyCatalog.Persistence.Entities;

namespace ProyCatalog.Persistence.DbContextCatalog
{
    public class CatalogContext : DbContext
    {
        public CatalogContext(DbContextOptions<CatalogContext> options) : base(options){}

        public DbSet<Product> Products { get; set; }
    }
}
