using System;

namespace CatalogCA.Application.ViewModels
{
    public class UserToken
    {
        public string? Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
