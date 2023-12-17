using AutoMapper;
using CatalogCA.Application.DTOs;
using CatalogCA.Application.Interfaces;
using CatalogCA.Domain.Entities;
using CatalogCA.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task Add(CategoryDTO categoryDTO)
        {
            var categoryEnt =_mapper.Map<Category>(categoryDTO);
            await _categoryRepository.PostAsync(categoryEnt);
        }

        public async Task Delete(int? id)
        {
            var categoryEnt = _categoryRepository.GetByIdAsync(id).Result;
            await _categoryRepository.DeleteAsync(categoryEnt);
        }

        public async Task<CategoryDTO> GetById(int? id)
        {
            var categoryEnt = await _categoryRepository.GetByIdAsync(id);
            return _mapper.Map<CategoryDTO>(categoryEnt);
        }

        public async Task<IEnumerable<CategoryDTO>> GetCategories()
        {
            try
            {
                var categoriesEnt = await _categoryRepository.GetAsync();
                var categoriesDTO = _mapper.Map<IEnumerable<CategoryDTO>>(categoriesEnt);

                return categoriesDTO;
            }
            catch (Exception) 
            {
                throw;
            }
        }

        public async Task Update(CategoryDTO categoryDTO)
        {
            var categoryEnt = _mapper.Map<Category>(categoryDTO);
            await _categoryRepository.PutAsync(categoryEnt);
        }

        public async Task<IEnumerable<CategoryDTO>> GetCategoriesByName(string? name)
        {
            try
            {
                var categoriesEnt = await _categoryRepository.GetByNameAsync(name);
                var categoriesDTO = _mapper.Map<IEnumerable<CategoryDTO>>(categoriesEnt);

                return categoriesDTO;
            }
            catch (Exception)
            {
                throw;
            }
    
        }
    }
}
