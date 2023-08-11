using CatalogCA.Domain.Validation;

namespace CatalogCA.Domain.Entities
{
    public sealed class Product : Entity
    {
        public Product(string name, string description, decimal price, string imageUrl, int stock, DateTime registerdate) 
        {
            ValidateDomain(name, description,price, imageUrl, stock, registerdate);
        }

        public string Name { get; private set; }
        public string Description { get; private set; }
        public decimal Price { get; private set; }
        public string ImageUrl { get; private set; }
        public int Stock { get; private set; }
        public DateTime Registerdate { get; private set; }

        public void Update(string name, string description, decimal price, string imageUrl, int stock, DateTime registerdate, int categoryId)
        {
            ValidateDomain(name, description, price, imageUrl, stock, registerdate);
            CategoryId = categoryId;
        }
        private void ValidateDomain(string name, string description, decimal price, string imageUrl, int stock, DateTime registerdate)
        {
            DomainExceptionValid.When(string.IsNullOrEmpty(name),
                "Nome inválido, o nome é obrigatório");
            DomainExceptionValid.When(name.Length < 3,
                "Nome inválido, deve ter no minimo 3 caracteres");
            DomainExceptionValid.When(string.IsNullOrEmpty(description),
                "Descrição inválida, a descrição é obrigatório");
            DomainExceptionValid.When(name.Length < 3,
                "Nome inválido, deve ter no minimo 3 caracteres");
            DomainExceptionValid.When(description.Length < 5,
                "Descrição inválida, deve ter no minimo 5 caracteres");
            DomainExceptionValid.When(price < 0, "Valor do preço inválido");
            DomainExceptionValid.When(imageUrl?.Length > 250,
                "Imagem inválida, o nome da imagem não pode exceder 250 caracteres");
            DomainExceptionValid.When(stock < 0, "Estoque inválido");

            Name = name;
            Description = description;
            Price = price;
            ImageUrl = imageUrl;
            Stock = stock;
            Registerdate = registerdate;
        }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
