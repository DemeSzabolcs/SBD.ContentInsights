using Umbraco.ContentInsights.Constants;

namespace Umbraco.ContentInsights.Models;

public class Document
{
    public DocumentStatus Status { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}
