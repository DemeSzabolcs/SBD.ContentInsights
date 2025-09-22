using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SBD.ContentInsights.Swagger;

public class ContentInsightsConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.SwaggerDoc("content-insights", new OpenApiInfo { Title = "Content Insights", Version = "1.0" });
        options.OperationFilter<ContentInsightsBackOfficeSecurityRequirementsOperationFilter>();
    }
}
