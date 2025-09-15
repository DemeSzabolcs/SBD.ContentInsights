using Umbraco.Cms.Core.Models;

namespace Umbraco.ContentInsights.Models;

public class UmbracoDocument
{
    public int Status { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Link { get; set; }

    // Technical type name.
    public string Type { get; set; }
    public string TypeName { get; set; } = string.Empty;

    public string AuthorKey { get; set; }

    public DateTime UpdateDate { get; set; }

    public UmbracoDocument(IContent content, string authorKey)
    {
        Status = content switch
        {
            { Trashed: true } => 2,
            { Published: true, Trashed: false } => 0,
            { Published: false, Trashed: false } => 1,
            _ => 0,
        };

        Name = content.Name ?? string.Empty;
        Link = $"/umbraco/section/content/workspace/document/edit/{content.Key}";
        Type = content.ContentType.Alias;
        TypeName = content.ContentType.Name ?? string.Empty;
        AuthorKey = authorKey;
        UpdateDate = content.UpdateDate;
    }
}
