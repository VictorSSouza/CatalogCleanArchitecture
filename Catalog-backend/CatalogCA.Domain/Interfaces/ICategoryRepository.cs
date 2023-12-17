using CatalogCA.Domain.Entities;

namespace CatalogCA.Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAsync();
        Task<IEnumerable<Category>> GetByNameAsync(string? name);
        Task<Category> GetByIdAsync(int? id);
        Task<Category> PostAsync(Category category);
        Task<Category> PutAsync(Category category);
        Task<Category> DeleteAsync(Category category);
    }
}
