namespace SBD.ContentInsights.Models;

public class DocumentsWithAuthors
{
    public IEnumerable<UmbracoDocument> Documents { get; set; } = [];
    public IEnumerable<Author> Authors { get; set; } = [];
}
