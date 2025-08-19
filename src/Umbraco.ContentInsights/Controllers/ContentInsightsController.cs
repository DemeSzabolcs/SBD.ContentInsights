using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Common.Routing;

namespace Umbraco.ContentInsights.Controllers;

[VersionedApiBackOfficeRoute("content-insights")]
[ApiExplorerSettings(GroupName = "Content Insights API")]
public class ContentInsightsController : ManagementApiControllerBase
{
    private readonly IContentTypeService _contentTypeService;

    public ContentInsightsController(IContentTypeService contentTypeService) =>
        _contentTypeService = contentTypeService;

    [HttpGet("get-content-types")]
    public IActionResult GetContentTypes()
    {
        var types = _contentTypeService.GetAll()
            .Select(ct => new
            {
                ct.Alias,
                ct.Name
            });

        return Ok(types);
    }
}
