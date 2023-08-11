using CatalogCA.Domain.Validation;

namespace CatalogCA.Domain.Entities
{
    public sealed class Category : Entity
    {
        public Category(string name, string imageUrl) 
        {
            ValidateDomain(name, imageUrl);
        }

        public Category(int id, string name, string imageUrl) 
        {
            DomainExceptionValid.When(id < 0, "O Id é inválido");
            Id = id;
            ValidateDomain(name, imageUrl);
        }

        public string Name { get; private set; }
        public string ImageUrl { get; private set; }
        public ICollection<Product> Products { get; set; }

        private void ValidateDomain(string name, string imageUrl)
        {
            DomainExceptionValid.When(string.IsNullOrEmpty(name),
                "Nome inválido, o nome é obrigatório");
            DomainExceptionValid.When(name.Length < 3,
                "Nome inválido, deve ter no minimo 3 caracteres");
            DomainExceptionValid.When(string.IsNullOrEmpty(imageUrl),
                "Nome da imagem inválido, o nome da imagem é obrigatório");
            DomainExceptionValid.When(imageUrl.Length < 5,
                "Nome da imagem inválido, deve ter no minimo 3 caracteres");

            Name = name;
            ImageUrl = imageUrl;
        }
    }
}
