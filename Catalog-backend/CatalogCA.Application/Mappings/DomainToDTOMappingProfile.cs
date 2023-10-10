using AutoMapper;
using CatalogCA.Application.DTOs;
using CatalogCA.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Application.Mappings
{
    public class DomainToDTOMappingProfile : Profile
    {   
        public DomainToDTOMappingProfile() 
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}
