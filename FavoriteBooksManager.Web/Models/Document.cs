using System.Text.Json.Serialization;

namespace FavoriteBooksManager.Web.Models
{
    public class Document
    {
        public string Key { get; set; }
        public string Title { get; set; }
        [JsonPropertyName("author_name")]
        public string[] AuthorName { get; set; }
        [JsonPropertyName("cover_i")]
        public int? CoverImage { get; set; }
    }
}
