using Umbraco.Cms.Core.Models;
using Umbraco.ContentInsights.Constants;

namespace Umbraco.ContentInsights.Models;

public class Document
{
    public DocumentStatus Status { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Link { get; set; }

    // Technical type name.
    public string Type { get; set; }
    public string TypeName { get; set; } = string.Empty;

    public string AuthorKey { get; set; }

    public DateTime UpdateDate { get; set; }

    public Document(IContent content, string authorKey)
    {
        ArgumentNullException.ThrowIfNull(content);

        Status = content switch
        {
            { Trashed: true } => DocumentStatus.Trashed,
            { Published: true, Trashed: false } => DocumentStatus.Public,
            { Published: false, Trashed: false } => DocumentStatus.Draft,
            _ => DocumentStatus.Draft,
        };

        Name = content.Name ?? string.Empty;
        Link = $"/umbraco/section/content/workspace/document/edit/{content.Key}";
        Type = content.ContentType.Alias;
        TypeName = content.ContentType.Name ?? string.Empty;
        AuthorKey = authorKey;
        UpdateDate = content.UpdateDate;
    }
}
