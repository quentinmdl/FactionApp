using Factio.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(ICustomerService), typeof(CustomerService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(INoteService), typeof(NoteService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IInvoiceService), typeof(InvoiceService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IBenefitService), typeof(BenefitService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IBusinessService), typeof(BusinessService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IHourService), typeof(HourService), ServiceLifetime.Transient));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
        }
    }
}
