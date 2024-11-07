using FondChecker.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<FondContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("FondCheckerContext"));
});

var app = builder.Build();

// Enable Swagger for development and testing
app.UseSwagger();
app.UseSwaggerUI();

// Enable serving static files from wwwroot
app.UseStaticFiles(); // <-- Add this line

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
