using Umbraco.Cms.Api.Management.OpenApi;

namespace SBD.ContentInsights.Swagger;

public class ContentInsightsBackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => "content-insights";
}
