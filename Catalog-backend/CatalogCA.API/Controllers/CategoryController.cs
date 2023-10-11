﻿using CatalogCA.Application.DTOs;
using CatalogCA.Application.Interfaces;
using CatalogCA.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CatalogCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;   
        }
        // GET: api/<CategoryController>
        [HttpGet]
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

        // GET api/<CategoryController>/5
        [HttpGet("{id}", Name = "GetCategoria")]
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