using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.ContentInsights.Models;

namespace Umbraco.ContentInsights.Controllers;

[VersionedApiBackOfficeRoute("content-insights")]
[ApiExplorerSettings(GroupName = "Content Insights API")]
public class ContentInsightsController : ManagementApiControllerBase
{
    private readonly IContentTypeService _contentTypeService;
    private readonly IContentService _contentService;
    private readonly IUserGroupService _userGroupService;
    private readonly IUserService _userService;

    public ContentInsightsController(
        IContentTypeService contentTypeService,
        IContentService contentService,
        IUserGroupService userGroupService,
        IUserService userService)
    {
        _contentTypeService = contentTypeService;
        _contentService = contentService;
        _userGroupService = userGroupService;
        _userService = userService;
    }

    [HttpGet("get-document-types")]
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
        var allDocuments = GetAllDocuments();

        var publicDocs = allDocuments
            .Where(content => content.Published && !content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document(content))
            .ToList();

        var draftDocs = allDocuments
            .Where(content => !content.Published && !content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document(content))
            .ToList();

        var trashedDocs = allDocuments
            .Where(content => content.Trashed)
            .DistinctBy(content => content.Id)
            .Select(content => new Document(content))
            .ToList();

        return Ok(new DocumentsByStatus
        {
            Public = publicDocs,
            Draft = draftDocs,
            Trashed = trashedDocs,
        });
    }

    [HttpGet("get-users-with-documents")]
    [ProducesResponseType(typeof(IEnumerable<Author>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUsersWithPermissions()
    {
        var neededPermissions = new[] { "Umb.Document.Create", "Umb.Document.Update", "Umb.Document.Publish" };

        var matchingUsers = new List<Author>();
        var userGroupsWithPermissions = (await _userGroupService.GetAllAsync(0, int.MaxValue)).Items
            .Where(group => group.Permissions.Intersect(neededPermissions).Any()).ToList();

        var allDocuments = GetAllDocuments();

        foreach (var group in userGroupsWithPermissions)
        {
            var users = _userService.GetAllInGroup(group.Id);

            foreach (var user in users)
            {
                matchingUsers.Add(new Author
                {
                    Name = user.Name ?? user.Username,
                    Email = user.Email,
                    Link = user.Key.ToString(),
                    UserGroups = user.Groups.Select(group => new UserGroup(group.Alias, group.Key.ToString())),
                    Documents = allDocuments
                        .Where(document =>
                            (document.PublisherId.HasValue && document.PublisherId == user.Id) ||
                            (!document.PublisherId.HasValue && document.WriterId == user.Id))
                        .Select(document => new Document(document)),
                });
            }
        }

        return Ok(matchingUsers);
    }

    private List<IContent> GetAllDocuments()
    {
        var allDocuments = new List<IContent>();

        // Get all root documents.
        var rootDocuments = _contentService.GetRootContent();
        allDocuments.AddRange(rootDocuments);

        // Get root documents' children.
        foreach (var rootDocument in rootDocuments)
        {
            var descendants = _contentService.GetPagedDescendants(rootDocument.Id, 0, int.MaxValue, out _);

            if (descendants != null)
            {
                allDocuments.AddRange(descendants);
            }
        }

        // Get documents from recycle bin.
        var trashedContent = _contentService.GetPagedContentInRecycleBin(0, int.MaxValue, out _);
        allDocuments.AddRange(trashedContent);
        return allDocuments;
    }
}
