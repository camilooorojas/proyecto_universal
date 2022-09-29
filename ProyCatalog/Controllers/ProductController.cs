using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyCatalog.Models;
using ProyCatalog.Persistence.Entities;
using ProyCatalog.Repositories;
using System.Numerics;
using System.Xml.Linq;

namespace ProyCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductRepository _productRepository;
        private IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public ProductController(IProductRepository productRepository, IMapper mapper, IWebHostEnvironment hostEnvironment)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] ProductDTO productDTO)
        {
            try
            {
                if (productDTO != null)
                {
                    var exist = await _productRepository.ProductByName(productDTO.Name);
                    if (!exist)
                    {
                        if(productDTO.ImageFile != null)
                            productDTO.URLImage = await SaveImage(productDTO.ImageFile);

                        Product product = _mapper.Map<ProductDTO, Product>(productDTO);

                        var guarda = await _productRepository.Add(product);



                        return Created("", new { message = "Producto ingresado." });
                    }
                    else
                        return BadRequest(new { message = "El producto ingresado ya existe." });
                }
                else
                    return BadRequest(new { message = "El producto enviado esta vacio." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var listProducts = await _productRepository.GetAll();
                if (listProducts.Count > 0)
                {
                    var URL = "http://localhost:5278/Images/";
                    List<ProductDTO> productsListDTO = _mapper.Map<List<Product>, List<ProductDTO>>(listProducts);
                    foreach (var product in productsListDTO)
                    {
                        var temp = "";
                        temp = product.URLImage;
                        product.URLImage = URL + temp;
                    }
                    return Ok(new { message = "Productos consultados exitosamente.", obj = productsListDTO });
                }
                else
                    return NotFound(new { message = "No existen productos actualmente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, [FromForm] ProductDTO productDTO)
            {
            var productdb = await _productRepository.GetById(id);
            if (productdb != null)
            {
               
                    if (productDTO.Name != null)
                        productdb.Name = productDTO.Name;
                    if (productDTO.Description != null)
                        productdb.Description = productDTO.Description;
                    if (productDTO.Category != null)
                        productdb.Category = productDTO.Category;
                    if (productDTO.Stock != 0)
                        productdb.Stock = productDTO.Stock;
                    if (productDTO.Price != 0)
                        productdb.Price = productDTO.Price;
                    if(productDTO.ImageFile != null)
                        productdb.URLImage = await SaveImage(productDTO.ImageFile);
              

                var edited = await _productRepository.Update(productdb);

                if (edited)
                {
                    productDTO = _mapper.Map<Product, ProductDTO>(productdb);

                    return Ok(new { message = "Se editó el producto exitosamente.", obj = productDTO });
                }
                else
                    return BadRequest(new { message = "El producto no fue editado." });

            }
            else
                return NotFound(new { message = "El producto no existe." });
        }


        [HttpDelete("DeleteProduct/{ProductId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _productRepository.GetById(productId);
            if (product != null)
            {
                var response = await _productRepository.Remove(productId);

                if (response != null)
                {
                    return Ok(new { message = "Se elimino el producto exitosamente." });
                }
                else
                    return BadRequest(new { message = "El producto no fue eliminado." });
            }
            else
                return NotFound(new { message = "El producto no existe." });
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetFileNameWithoutExtension(imageFile.FileName);
            imageName += ".jpg";
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStram = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStram);
            }
            
            return imageName;
        }
    }
}
