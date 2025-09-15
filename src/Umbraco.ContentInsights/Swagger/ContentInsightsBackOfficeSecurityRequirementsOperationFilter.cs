using Umbraco.Cms.Api.Management.OpenApi;

namespace Umbraco.ContentInsights.Swagger;

public class ContentInsightsBackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => "content-insights";
}
