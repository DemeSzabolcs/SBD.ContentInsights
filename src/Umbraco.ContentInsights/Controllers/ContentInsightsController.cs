using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.ContentInsights.Constants;
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
                Type = contentType.Alias,
                Name = contentType.Name ?? string.Empty,
                Count = _contentService.Count(contentType.Alias),
            });

        types = types.OrderByDescending(type => type.Count);

        return Ok(types);
    }

    [HttpGet("get-documents-by-status")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public IActionResult GetDocuments()
    {
        var allContent = new List<IContent>();

        // Get all root documents.
        var rootContents = _contentService.GetRootContent();
        allContent.AddRange(rootContents);

        // Get root documents' children.
        foreach (var rootContent in rootContents)
        {
            var descendants = _contentService.GetPagedDescendants(rootContent.Id, 0, int.MaxValue, out _);

            if (descendants != null)
            {
                allContent.AddRange(descendants);
            }
        }

        // Get documents from recycle bin.
        var trashedContent = _contentService.GetPagedContentInRecycleBin(0, int.MaxValue, out _);
        allContent.AddRange(trashedContent);

        var publicDocs = allContent
            .Where(content => content.Published && !content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document
            {
                Status = DocumentStatus.Public,
                Name = content.Name ?? string.Empty,
                Link = $"/umbraco/section/content/workspace/document/edit/{content.Key}",
                Type = content.ContentType.Alias,
                TypeName = content.ContentType.Name ?? string.Empty,
            })
            .ToList();

        var draftDocs = allContent
            .Where(content => !content.Published && !content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document
            {
                Status = DocumentStatus.Draft,
                Name = content.Name ?? string.Empty,
                Link = $"/umbraco/section/content/workspace/document/edit/{content.Key}",
                Type = content.ContentType.Alias,
                TypeName = content.ContentType.Name ?? string.Empty,
            })
            .ToList();

        var trashedDocs = allContent
            .Where(content => content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document
            {
                Status = DocumentStatus.Trashed,
                Name = content.Name ?? string.Empty,
                Link = $"/umbraco/section/content/workspace/document/edit/{content.Key}",
                Type = content.ContentType.Alias,
                TypeName = content.ContentType.Name ?? string.Empty,
            })
            .ToList();

        return Ok(new DocumentsByStatus
        {
            Public = publicDocs,
            Draft = draftDocs,
            Trashed = trashedDocs,
            PublicCount = publicDocs.Count,
            DraftCount = draftDocs.Count,
            TrashedCount = trashedDocs.Count,
        });
    }
}
