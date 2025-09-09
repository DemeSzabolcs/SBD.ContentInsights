namespace Umbraco.ContentInsights.Models;

public class DocumentsWithAuthors
{
    public IEnumerable<Document> Documents { get; set; } = [];
    public IEnumerable<Author> Authors { get; set; } = [];
}
