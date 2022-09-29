namespace ProyCatalog.Persistence.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string URLImage { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }        
    }
}
