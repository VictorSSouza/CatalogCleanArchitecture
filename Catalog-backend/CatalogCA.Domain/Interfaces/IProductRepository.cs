using CatalogCA.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAsync();
        Task<IEnumerable<Product>> GetByNameAsync(string? name);
        Task<Product> GetByIdAsync(int? id);
        Task<Product> PostAsync(Product product);
        Task<Product> PutAsync(Product product);
        Task<Product> DeleteAsync(Product product);

    }
}
