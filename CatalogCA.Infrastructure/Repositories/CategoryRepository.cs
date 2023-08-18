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
    public class CategoryRepository : ICategoryRepository
    {
        private CatalogDbContext _categoryContext;
        public CategoryRepository(CatalogDbContext categoryContext)
        {
            _categoryContext = categoryContext;
        }

        public async Task<Category> DeleteAsync(Category category)
        {
            _categoryContext.Remove(category);
            await _categoryContext.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetAsync()
        {
            try
            {
                var categories = await _categoryContext.Categories.ToListAsync();
                return categories;
            }
            catch (Exception ex)
            {
                var error1 = ex.Message;
                var error2 = ex.StackTrace;
                var error3 = ex.InnerException;
                throw;
            }
        }

        public async Task<Category> GetByIdAsync(int? id)
        {
            return await _categoryContext.Categories.FindAsync(id);
        }

        public async Task<Category> PostAsync(Category category)
        {
            _categoryContext.Add(category);
            await _categoryContext.SaveChangesAsync();
            return category;
        }

        public async Task<Category> PutAsync(Category category)
        {
            _categoryContext.Update(category);
            await _categoryContext.SaveChangesAsync();
            return category;

        }
    }
}
