namespace Physiotherapy.Api;

public interface IEntityRepository<T> where T : class
{
    ValueTask<T> AddAsync(T entity);

    ValueTask<T?> GetAsync(params object[] id);

    ValueTask<IEnumerable<T>> AllAsync();

    ValueTask UpdateAsync(T entity);

    ValueTask DeleteAsync(T entity);
}