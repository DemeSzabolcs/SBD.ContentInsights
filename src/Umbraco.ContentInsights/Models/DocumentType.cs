namespace Umbraco.ContentInsights.Models;

public class DocumentType
{
    public string Alias { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Count { get; set; }
}
