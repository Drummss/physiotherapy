using Physiotherapy.Api;

namespace Physiotherapy.UnitTests;

public class Entity
{
    public int Id { get; set; }

    public string? Name { get; set; }
}

public class EntityWithStringId
{
    public string Id { get; set; }

    public string? Name { get; set; }
}

public class EntityWithGuidId
{
    public Guid Id { get; set; }

    public string? Name { get; set; }
}

public class InMemoryEntityRepositoryTests
{
    [Fact]
    public async Task AddAsyncTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity1 = await repository.AddAsync(new Entity { Name = "Test1" });
        Entity entity2 = await repository.AddAsync(new Entity { Name = "Test2" });
        
        Assert.Equal(1, entity1.Id);
        Assert.Equal("Test1", entity1.Name);
        Assert.Equal(2, entity2.Id);
        Assert.Equal("Test2", entity2.Name);
    }
    
    [Fact]
    public async Task GetAsyncTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity1 = await repository.AddAsync(new Entity { Name = "Test1" });
        Entity entity2 = await repository.AddAsync(new Entity { Name = "Test2" });

        Entity? result1 = await repository.GetAsync(entity1.Id);
        Entity? result2 = await repository.GetAsync(entity2.Id);

        Assert.Equal(entity1, result1);
        Assert.Equal(entity2, result2);
    }
    
    [Fact]
    public async Task AllAsyncTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        await repository.AddAsync(new Entity { Name = "Test1" });
        await repository.AddAsync(new Entity { Name = "Test2" });

        IEnumerable<Entity> allEntities = await repository.AllAsync();

        Assert.Equal(2, allEntities.Count());
    }
    
    [Fact]
    public async Task UpdateAsyncTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity = await repository.AddAsync(new Entity { Name = "Test1" });
        entity.Name = "UpdatedName";

        await repository.UpdateAsync(entity);

        Entity? updatedEntity = await repository.GetAsync(entity.Id);
        
        Assert.Equal("UpdatedName", updatedEntity?.Name);
    }
    
    [Fact]
    public async Task DeleteAsyncTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity = await repository.AddAsync(new Entity { Name = "Test1" });

        await repository.DeleteAsync(entity);

        Entity? deletedEntity = await repository.GetAsync(entity.Id);
        
        Assert.Null(deletedEntity);
    }
    
    [Fact]
    public async Task AddAsyncThrowsWhenExistsTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity = new() { Id = 1, Name = "Test1" };
        await repository.AddAsync(entity);

        await Assert.ThrowsAsync<InvalidOperationException>(async () => await repository.AddAsync(entity));
    }
    
    [Fact]
    public async Task AddAsyncThrowsWhenIdIsNullTest()
    {
        InMemoryEntityRepository<EntityWithStringId> repository = new();

        EntityWithStringId entity = new() { Name = "Test1" };

        await Assert.ThrowsAsync<InvalidOperationException>(async () => await repository.AddAsync(entity));
    }
    
    [Fact]
    public async Task UpdateAsyncThrowsWhenNotExistsTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity = new() { Id = 1, Name = "Test1" };
        
        await Assert.ThrowsAsync<InvalidOperationException>(async () => await repository.UpdateAsync(entity));
    }
    
    [Fact]
    public async Task DeleteAsyncThrowsWhenNotExistsTest()
    {
        InMemoryEntityRepository<Entity> repository = new();

        Entity entity = new() { Id = 1, Name = "Test1" };
        
        await Assert.ThrowsAsync<InvalidOperationException>(async () => await repository.DeleteAsync(entity));
    }
    
    [Fact]
    public async Task GuidIdTest()
    {
        InMemoryEntityRepository<EntityWithGuidId> repository = new();

        EntityWithGuidId entity = new() { Id = Guid.NewGuid(), Name = "Test1" };
        await repository.AddAsync(entity);

        EntityWithGuidId? result = await repository.GetAsync(entity.Id);

        Assert.Equal(entity, result);
    }
}