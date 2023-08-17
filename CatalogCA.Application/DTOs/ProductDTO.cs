using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalogCA.Application.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o nome do Produto!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Informe a descrição do Produto!")]
        [MinLength(5)]
        [MaxLength(200)]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Informe o preço do Produto!")]
        [Column(TypeName = "decimal(18,2)")]
        [DisplayFormat(DataFormatString = "{0:C2}")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [MaxLength(250)]
        public string? ImageUrl { get; set; }

        [Required(ErrorMessage = "Informe a quantidade em Estoque")]
        [Range(1,9999)]
        public int Stock { get; set; }

        [Required(ErrorMessage = "Informe a data do Cadastro")]
        public DateTime RegisterDate { get; set; }
        public int CategoryId { get; set; }

    }
}
