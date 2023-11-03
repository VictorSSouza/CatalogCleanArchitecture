﻿using System.ComponentModel.DataAnnotations;

namespace CatalogCA.Application.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória")]
        [StringLength(20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo de {1} caracteres", MinimumLength = 10)]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
