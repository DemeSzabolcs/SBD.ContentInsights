namespace Umbraco.ContentInsights.Models;

public class DocumentsByStatus
{
    public IEnumerable<Document> Public { get; set; } = [];
    public IEnumerable<Document> Draft { get; set; } = [];
    public IEnumerable<Document> Trashed { get; set; } = [];

    public int PublicCount { get; set; }
    public int DraftCount { get; set; }
    public int TrashedCount { get; set; }
}
