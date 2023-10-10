using CatalogCA.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Infrastructure.EntitiesConfiguration
{
    public class CategoriesConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
            builder.Property(x => x.ImageUrl).HasMaxLength(250).IsRequired();

            builder.HasData(
                    new Category(1, "Bebidas", "bebidas.jpg"),
                    new Category(2, "Eletrônicos", "eletronicos.jpg"),
                    new Category(3, "Biscoitos", "biscoitos.jpg")
                );
        }
    }
}
