namespace ProyCatalog.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity> GetById(int id);
        Task<List<TEntity>> GetAll();
        Task<bool> Add(TEntity entity);
        Task<bool> AddRange(IEnumerable<TEntity> entities);
        Task<bool> Update(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entities);
        Task<TEntity> Remove(int entityId);
        void RemoveRange(IEnumerable<TEntity> entities);
    }
}
