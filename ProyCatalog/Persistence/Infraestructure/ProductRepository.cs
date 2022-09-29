using Microsoft.EntityFrameworkCore;
using ProyCatalog.Persistence.DbContextCatalog;
using ProyCatalog.Persistence.Entities;
using ProyCatalog.Repositories;

namespace ProyCatalog.Persistence.Infraestructure
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(CatalogContext context) : base(context)
        {
        }

        public async Task<bool> ProductByName(string name)
        {
            var response = await _entities.Where(x => x.Name == name).ToListAsync();

            if(response.Count == 0)
                return false;
            else
                return true;
        }
    }
}
