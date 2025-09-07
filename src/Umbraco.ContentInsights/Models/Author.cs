namespace Umbraco.ContentInsights.Models;

public record UserGroup(string Name, string Key);

public class Author
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;

    public IEnumerable<UserGroup> UserGroups { get; set; } = [];

    public IEnumerable<Document> Documents { get; set; } = [];
}
