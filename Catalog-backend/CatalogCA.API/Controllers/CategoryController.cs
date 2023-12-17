using CatalogCA.Application.DTOs;
using CatalogCA.Application.Interfaces;
using CatalogCA.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CatalogCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;   
        }
        // GET: api/<CategoryController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> Get()
        {
            try 
            {
                var categories = await _categoryService.GetCategories();
                return Ok(categories);
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
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetByName([FromQuery]string? name)
        {
            try
            {
                var categories = await _categoryService.GetCategoriesByName(name);

                if(categories == null)
                    return NotFound($"Categorias não encontradas com esse nome = {name}");

                return Ok(categories);
            }
            catch
            {
                throw;
            }
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}", Name = "GetCategoria")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryDTO>> Get(int id)
        {
            var category = await _categoryService.GetById(id);

            if(category == null)
            {
                return NotFound("Categoria não encontrada!");
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] CategoryDTO categoryDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _categoryService.Add(categoryDTO);
            return new CreatedAtRouteResult("GetCategoria", new { id = categoryDTO.Id, categoryDTO });
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(id != categoryDTO.Id)
            {
                return BadRequest("Id inválido");
            }
            await _categoryService.Update(categoryDTO);
            return Ok(categoryDTO);

        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Category>> Delete(int id)
        {
            var categoryDTO = await _categoryService.GetById(id);
            if(categoryDTO == null)
            {
                return NotFound("Categoria não encontrada");
            }
            await _categoryService.Delete(id);
            return Ok(categoryDTO);
        }
    }
}
