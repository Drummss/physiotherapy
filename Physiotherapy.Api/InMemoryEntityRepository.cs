using System.Collections.Concurrent;
using System.Reflection;

namespace Physiotherapy.Api;

public class InMemoryEntityRepository<T> : IEntityRepository<T>
    where T : class
{
    private readonly PropertyInfo _idProperty;
    private readonly ConcurrentDictionary<object, T> _entities = new();

    private int _nextId;

    public InMemoryEntityRepository()
    {
        _idProperty = typeof(T).GetProperty("Id") ??
                      throw new InvalidOperationException($"Type {typeof(T).Name} does not have an Id property.");
    }

    public ValueTask<T> AddAsync(T entity)
    {
        object? id = _idProperty.GetValue(entity);
        Type idType = Nullable.GetUnderlyingType(_idProperty.PropertyType) ?? _idProperty.PropertyType;

        if (idType == typeof(int) && (id == null || Convert.ToInt32(id) == 0))
        {
            int newId = Interlocked.Increment(ref _nextId);
            _idProperty.SetValue(entity, newId);
            id = newId;
        }

        if (id is null) throw new InvalidOperationException("Entity must have an ID set.");
        
        if(!_entities.TryAdd(id, entity)) throw new InvalidOperationException($"Entity with ID {id} already exists.");
        
        return ValueTask.FromResult(entity);
    }

    public ValueTask<T?> GetAsync(params object[] id)
    {
        _entities.TryGetValue(id[0], out T? entity);
        return ValueTask.FromResult(entity);
    }

    public ValueTask<IEnumerable<T>> AllAsync()
    {
        IEnumerable<T> entities = _entities.Values;
        return ValueTask.FromResult(entities);
    }

    public ValueTask UpdateAsync(T entity)
    {
        object? id = _idProperty.GetValue(entity);
        
        if (id is null) throw new InvalidOperationException("Entity must have an ID set.");

        try
        {
            _entities.TryUpdate(id, entity, _entities[id]);
        }
        catch (Exception e)
        {
            throw new InvalidOperationException($"Entity with ID {id} does not exist.");
        }

        return default;
    }

    public ValueTask DeleteAsync(T entity)
    {
        object? id = _idProperty.GetValue(entity);
        
        if (id is null) throw new InvalidOperationException("Entity must have an ID set.");

        if (!_entities.TryRemove(id, out _))
            throw new InvalidOperationException($"Entity with ID {id} does not exist.");

        return default;
    }
}