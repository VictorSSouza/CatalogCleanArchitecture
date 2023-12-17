using CatalogCA.Application.DTOs;
using CatalogCA.Application.Interfaces;
using CatalogCA.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CatalogCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET : api/<ProductController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> Get()
        {
            try
            {
                var products = await _productService.GetProducts();
                return Ok(products);
            }
            catch
            {
                throw;
            }
        }

        // GET: api/<CategoryController>
        [HttpGet("OrderByName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetByName([FromQuery] string? name)
        {
            try
            {
                var products = await _productService.GetProductsByName(name);

                if (products == null)
                    return NotFound($"Produtos não encontradas com esse nome = {name}");

                return Ok(products);
            }
            catch
            {
                throw;
            }
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}", Name = "GetProduto")]
        public async Task<ActionResult<ProductDTO>> Get(int id)
        {
            var product = await _productService.GetById(id);
            if(product == null)
            {
                return NotFound("Produto não encontrado!");
            }

            return Ok(product);
        }

        // POST : api/<ProductController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] ProductDTO productDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _productService.Add(productDTO);
            return new CreatedAtRouteResult("GetProduto", new { id = productDTO.Id, productDTO});
        }

        // PUT : api/<ProductController>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProductDTO productDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != productDTO.Id)
            {
                return BadRequest("Id inválido");
            }
            await _productService.Update(productDTO);
            return Ok(productDTO);
        }

        // DELETE : api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _productService.GetById(id);
            if(product == null)
            {
                return NotFound("Produto não encontrado!");
            }
            await _productService.Delete(id);
            return Ok(product);

        }
    }
}
