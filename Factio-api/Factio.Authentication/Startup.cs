using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Factio.BL;
using Factio.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Factio.Authentication
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
            //var emailConfig = Configuration
            //   .GetSection("EmailConfiguration")
            //   .Get<EmailConfiguration>();
            //services.AddSingleton(emailConfig);
            //services.AddScoped<IEmailSender, EmailSender>();

            services.AddRazorPages();

            services.AddControllers();

            // configure strongly typed settings object
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            //Auth Facebook
            //services.AddAuthentication().AddFacebook(fb =>
            //{
            //    fb.AppId = Configuration.GetSection("Authentication").GetSection("FacebookAppId").Value;
            //    fb.AppSecret = Configuration.GetSection("Authentication").GetSection("FacebookAppSecret").Value;
            //})
            //    //auth google
            //.AddGoogle(google =>
            //{
            //    google.ClientId = Configuration.GetSection("Authentication").GetSection("GoogleAppId").Value;
            //    google.ClientSecret = Configuration.GetSection("Authentication").GetSection("GoogleAppSecret").Value;
            //});

            //services.Add(new ServiceDescriptor(typeof(IMailService), typeof(MailSender), ServiceLifetime.Transient));

            ////Configuration param?tres mails
            //services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            //services.AddTransient<IMailService, MailSender>();

            //Enregistrement des profiles d'automapper
            services.AddAutoMapper(typeof(Profile));

            // configure DI for application services
            services.AddScoped<IAuthService, AuthService>();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();

            //Enregistrement des profiles d'automapper
            services.AddAutoMapper(typeof(Profile));

            #region Allow-Orgin
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });
            #endregion


            //Enregistrement des services de la BL 
            services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Transient));
            //services.Add(new ServiceDescriptor(typeof(BTBContext), new BTBContext(Configuration.GetConnectionString("DefaultConnection"))));
            services.AddDbContext<FactioContext>(options => options.UseSqlServer(
                Configuration.GetConnectionString("MyDbConnection")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthorization();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
