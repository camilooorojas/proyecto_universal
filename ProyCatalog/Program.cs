using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;
using ProyCatalog.Persistence.DbContextCatalog;
using ProyCatalog.Persistence.Entities;
using ProyCatalog.Persistence.Infraestructure;
using ProyCatalog.Repositories;


var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllersWithViews();
var connectionString = builder.Configuration.GetConnectionString("BloggingDatabase");
builder.Services.AddDbContext<CatalogContext>(options =>
    options.UseSqlServer(connectionString));


/* To use AutoMapper */
builder.Services.AddAutoMapper(typeof(Product));

/* To use injection */
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

app.UseCors(options => options.WithOrigins("http://localhost:3000")
//app.UseCors(options => options.WithOrigins("http://localhost:44491")
.AllowAnyMethod()
.AllowAnyHeader());

// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//app.UseStaticFiles(new StaticFileOptions
//{
//    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "Images")),
//    RequestPath = "/Images"
//});

app.UseStaticFiles();
app.UseRouting();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")),
        RequestPath = "/Images"
});


app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
