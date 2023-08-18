using CatalogCA.Domain.Entities;
using CatalogCA.Domain.Interfaces;
using CatalogCA.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private CatalogDbContext _productContext;
        public ProductRepository(CatalogDbContext productContext)
        {
            _productContext = productContext;
        }

        public async Task<Product> DeleteAsync(Product product)
        {
            _productContext.Remove(product);
            await _productContext.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<Product>> GetAsync()
        {
            try
            {
                var products = await _productContext.Products.ToListAsync();
                return products;
            }
            catch(Exception ex)
            {
                var error1 = ex.Message;
                var error2 = ex.StackTrace;
                var error3 = ex.InnerException;
                throw;
            }
        }

        public async Task<Product> GetByIdAsync(int? id)
        {
            return await _productContext.Products.FindAsync(id);
        }

        public async Task<Product> PostAsync(Product product)
        {
            _productContext.Add(product);
            await _productContext.SaveChangesAsync();
            return product;
        }

        public async Task<Product> PutAsync(Product product)
        {
            _productContext.Update(product);
            await _productContext.SaveChangesAsync();
            return product;
        }
    }
}
