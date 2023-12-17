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
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            _mapper = mapper;
        }

        public async Task Add(ProductDTO productDTO)
        {
            var productEnt = _mapper.Map<Product>(productDTO);
            await _productRepository.PostAsync(productEnt);
        }

        public async Task Delete(int? id)
        {
            var productEnt = _productRepository.GetByIdAsync(id).Result;
            await _productRepository.DeleteAsync(productEnt);
        }

        public async Task<ProductDTO> GetById(int? id)
        {
            var productEnt = await _productRepository.GetByIdAsync(id);
            return _mapper.Map<ProductDTO>(productEnt);
        }

        public async Task<IEnumerable<ProductDTO>> GetProducts()
        {
            try
            {
                var productsEnt = await _productRepository.GetAsync();
                var productsDTO = _mapper.Map<IEnumerable<ProductDTO>>(productsEnt);
                return productsDTO;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task Update(ProductDTO productDTO)
        {
            var productEnt = _mapper.Map<Product>(productDTO);
            await _productRepository.PutAsync(productEnt);
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsByName(string? name)
        {
            try
            {
                var productsEnt = await _productRepository.GetByNameAsync(name);
                var productsDTO = _mapper.Map<IEnumerable<ProductDTO>>(productsEnt);

                return productsDTO;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
