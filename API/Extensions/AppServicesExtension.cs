using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class AppServicesExtension
    {
        public static IServiceCollection AddAppServices ( this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            opt.UseSqlite(config.GetConnectionString("DefaultConnection")));
            services.AddCors();

            return services;
        }
    }
}
