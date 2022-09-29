using ProyCatalog.Persistence.Entities;

namespace ProyCatalog.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<bool> ProductByName(string name);
    }
}
