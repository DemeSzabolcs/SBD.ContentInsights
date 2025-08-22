using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.ContentInsights.Models;

namespace Umbraco.ContentInsights.Controllers;

[VersionedApiBackOfficeRoute("content-insights")]
[ApiExplorerSettings(GroupName = "Content Insights API")]
public class ContentInsightsController : ManagementApiControllerBase
{
    private readonly IContentTypeService _contentTypeService;
    private readonly IContentService _contentService;

    public ContentInsightsController(IContentTypeService contentTypeService, IContentService contentService)
    {
        _contentTypeService = contentTypeService;
        _contentService = contentService;
    }

    [HttpGet("get-content-types")]
    [ProducesResponseType(typeof(IEnumerable<DocumentType>), StatusCodes.Status200OK)]
    public IActionResult GetContentTypes()
    {
        var types = _contentTypeService.GetAll()
            .Select(contentType => new DocumentType
            {
                Alias = contentType.Alias,
                Name = contentType.Name ?? string.Empty,
                Count = _contentService.Count(contentType.Alias),
            });

        return Ok(types);
    }
}
