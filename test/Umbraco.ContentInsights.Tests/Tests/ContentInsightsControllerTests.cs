using Microsoft.AspNetCore.Mvc;
using Moq;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Persistence.Querying;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.ContentInsights.Controllers;
using Umbraco.ContentInsights.Models;
using UserGroup = Umbraco.Cms.Core.Models.Membership.UserGroup;

namespace Umbraco.ContentInsights.Tests.Tests;

public class ContentInsightsControllerTests
{
    private readonly GlobalSettings globalSettings = new();
    private readonly IShortStringHelper _shortStringHelper = new DefaultShortStringHelper(new DefaultShortStringHelperConfig());
    private readonly Mock<IContentTypeService> _contentTypeServiceMock = new();
    private readonly Mock<IContentService> _contentServiceMock = new();
    private readonly Mock<IUserGroupService> _userGroupServiceMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();

    private ContentInsightsController CreateControllerContentInsightsController() =>
        new(
            _contentTypeServiceMock.Object,
            _contentServiceMock.Object,
            _userGroupServiceMock.Object,
            _userServiceMock.Object
        );

    [Fact]
    public void GetContentTypesShouldReturnOrderedContentTypes()
    {
        var contentTypes = new[]
        {
                new ContentType(_shortStringHelper, 123) { Alias = "type1", Name = "Type 1" },
                new ContentType(_shortStringHelper, 456) { Alias = "type2", Name = "Type 2" },
                new ContentType(_shortStringHelper, 789) { Alias = "type3", Name = "Type 3" },
        };

        _contentTypeServiceMock.Setup(service => service.GetAll())
            .Returns(contentTypes);

        _contentServiceMock.Setup(service => service.Count("type1")).Returns(5);
        _contentServiceMock.Setup(service => service.Count("type2")).Returns(10);
        _contentServiceMock.Setup(service => service.Count("type3")).Returns(15);

        using var controller = CreateControllerContentInsightsController();

        var result = controller.GetContentTypes();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var types = Assert.IsAssignableFrom<IEnumerable<DocumentType>>(okResult.Value).ToList();

        var expectedTypes = new List<DocumentType>
        {
            new() { Type = "type3", Name = "Type 3", Count = 15 },
            new() { Type = "type2", Name = "Type 2", Count = 10 },
            new() { Type = "type1", Name = "Type 1", Count = 5 },
        };

        for (int i = 0; i < expectedTypes.Count; i++)
        {
            Assert.Equal(expectedTypes[i].Type, types[i].Type);
            Assert.Equal(expectedTypes[i].Name, types[i].Name);
            Assert.Equal(expectedTypes[i].Count, types[i].Count);
        }
    }

    [Fact]
    public async Task GetAllDocumentsWithAuthorsReturnsDocumentsAndAuthors()
    {
        var writersUserGroup = new UserGroup(_shortStringHelper)
        {
            Id = 1,
            Alias = "writers",
            Name = "Writers",
            Permissions = new HashSet<string> { "Umb.Document.Create" },
        };

        var notWritersUserGroup = new UserGroup(_shortStringHelper)
        {
            Id = 2,
            Alias = "notWriters",
            Name = "Not Writers",
        };

        var groups = new List<IUserGroup> { writersUserGroup, notWritersUserGroup };

        var pagedModel = new PagedModel<IUserGroup>(groups.Count, groups);

        _userGroupServiceMock
            .Setup(service => service.GetAllAsync(0, int.MaxValue))
            .ReturnsAsync(pagedModel);

        var writerUser = new User(globalSettings)
        {
            Id = 123,
            Name = "Writer User",
            Email = "writeruser@example.com",
            Key = Guid.NewGuid(),
        };

        var notWriterUser = new User(globalSettings)
        {
            Id = 456,
            Name = "Not Writer User",
            Email = "notwriteruser@example.com",
            Key = Guid.NewGuid(),
        };

        _userServiceMock.Setup(service => service.GetAllInGroup(writersUserGroup.Id))
            .Returns(new List<User> { writerUser });

        _userServiceMock.Setup(service => service.GetAllInGroup(notWritersUserGroup.Id))
            .Returns(new List<User> { notWriterUser });

        var contentTypeMock = new Mock<IContentType>();
        contentTypeMock.SetupGet(contentType => contentType.Alias).Returns("testType");
        contentTypeMock.SetupGet(contentType => contentType.Name).Returns("Test Type");
        contentTypeMock.SetupGet(contentType => contentType.DefaultTemplate).Returns((ITemplate?)null);

        var simpleContentType = new SimpleContentType(contentTypeMock.Object);

        var content = Mock.Of<IContent>(content =>
            content.Id == 1 &&
            content.WriterId == writerUser.Id &&
            content.PublisherId == null &&
            content.UpdateDate == DateTime.Now &&
            content.ContentType == simpleContentType);

        _contentServiceMock.Setup(service => service.GetRootContent())
            .Returns([content]);

        _contentServiceMock.Setup(service =>
            service.GetPagedDescendants(
                It.IsAny<int>(),
                0,
                int.MaxValue,
                out It.Ref<long>.IsAny,
                It.IsAny<IQuery<IContent>>(),
                It.IsAny<Ordering>()))
            .Returns([]);

        _contentServiceMock.Setup(service =>
            service.GetPagedContentInRecycleBin(
                0,
                int.MaxValue,
                out It.Ref<long>.IsAny,
                It.IsAny<IQuery<IContent>>(),
                It.IsAny<Ordering>()))
            .Returns([]);

        using var controller = CreateControllerContentInsightsController();

        var result = await controller.GetAllDocumentsWithAuthors();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var documentsWithAuthors = Assert.IsType<DocumentsWithAuthors>(okResult.Value);

        var authors = documentsWithAuthors.Authors.ToList();
        var documents = documentsWithAuthors.Documents.ToList();

        var expectedAuthors = new List<Author>
        {
            new()
            {
                Name = writerUser.Name,
                Email = writerUser.Email,
                Link = writerUser.Key.ToString(),
                UserGroups = writerUser.Groups.Select(group =>
                    new Models.UserGroup(group.Alias, group.Key.ToString())).ToList(),
            },
        };

        var expectedDocuments = new List<Document>
        {
                new(content, writerUser.Key.ToString()),
        };

        for (int i = 0; i < expectedAuthors.Count; i++)
        {
            Assert.Equal(expectedAuthors[i].Name, authors[i].Name);
            Assert.Equal(expectedAuthors[i].Email, authors[i].Email);
            Assert.Equal(expectedAuthors[i].Link, authors[i].Link);
        }

        for (int i = 0; i < expectedDocuments.Count; i++)
        {
            Assert.Equal(expectedDocuments[i].Link, documents[i].Link);
            Assert.Equal(expectedDocuments[i].Name, documents[i].Name);
            Assert.Equal(expectedDocuments[i].Type, documents[i].Type);
            Assert.Equal(expectedDocuments[i].AuthorKey, documents[i].AuthorKey);
        }
    }
}
