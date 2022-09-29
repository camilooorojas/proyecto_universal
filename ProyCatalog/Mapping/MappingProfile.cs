using AutoMapper;
using ProyCatalog.Models;
using ProyCatalog.Persistence.Entities;

namespace ProyCatalog.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();
        }
    }
}
