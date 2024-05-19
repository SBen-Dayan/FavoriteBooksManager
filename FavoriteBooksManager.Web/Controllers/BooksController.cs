using FavoriteBooksManager.Data;
using FavoriteBooksManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Azure.Core.HttpHeader;

namespace FavoriteBooksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly string _conStr;

        public BooksController(IConfiguration configuration)
        {
            _conStr = configuration.GetConnectionString("ConStr");
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public List<Book> Search(string query)
        {
            var result = new HttpClient().GetFromJsonAsync<BooksSearchResult>
                ($"https://openlibrary.org/search.json?q={query}").Result;

            if (result == null)
            {
                return null;
            }

            var books = new List<Book>();
            foreach (var doc in result.Docs)
            {
                var book = new Book
                {
                    Key = doc.Key,
                    Title = doc.Title,
                    Author = doc.AuthorName?.Length > 0 ? doc.AuthorName[0] : "Unknown Author",
                    CoverImage = doc.CoverImage.HasValue ? $"https://covers.openlibrary.org/b/id/{doc.CoverImage}-M.jpg" : "https://via.placeholder.com/150"
                };
                books.Add(book);
            }
            return books;

            //return new HttpClient().GetFromJsonAsync<BooksSearchResult>
            //    ($"https://openlibrary.org/search.json?q={query}")
            //    .Result
            //    ?.Docs.Select(d => new Book
            //    {
            //        Key = d.Key,
            //        Title = d.Title,
            //        Author = d.AuthorName.FirstOrDefault(),
            //        CoverImage = d.CoverImage.HasValue ?
            //        $"https://covers.openlibrary.org/b/id/{d.CoverImage}-M.jpg" :
            //        "https://via.placeholder.com/150"
            //    }).ToList();
        }

        [HttpGet("GetTopFavorites")]
        [AllowAnonymous]
        public List<Book> GetTopFavorites(int limit)
        {
            var result = new BooksRepository(_conStr).GetTopFavorites(limit);
            return result == null ? null :
                result.Select(b => new Book { Title = b.Title, Author = b.Author, CoverImage = b.CoverImage }).ToList();
        }

        [HttpGet("getFavorites")]
        public List<FavoriteBook> GetFavorites()
        {
            return new BooksRepository(_conStr).Get(GetCurrentUserId());
        }

        [HttpGet("getFavoriteBookKeys")]
        public List<string> GetFavoriteBookKeys()
        {
            return new BooksRepository(_conStr).GetFavoriteBooksKeys(GetCurrentUserId());
        }

        [HttpPost("addToFavorites")]
        public void AddToFavorites(FavoriteBook favoriteBook)
        {
            favoriteBook.UserId = GetCurrentUserId();
            new BooksRepository(_conStr).Insert(favoriteBook);
        }

        [HttpPost("updateBookNote")]
        public void UpdateFavoriteBookNotes(BookNotesModel model)
        {
            var repo = new BooksRepository(_conStr);
            if (!repo.IsUsersBook(GetCurrentUserId(), model.Id))
            {
                return;
            }

            repo.UpdateBookNote(model.Id, model.Notes);
        }

        [HttpPost("removeFromFavorites")]
        public void DeleteFavoriteBook(KeyModel model)
        {
            var repo = new BooksRepository(_conStr);
            var id = repo.GetId(model.Key);
            if (id == null || !repo.IsUsersBook(GetCurrentUserId(), id.Value))
            {
                return;
            }

            repo.Delete(id.Value);
        }

        private int GetCurrentUserId() => new UserRepository(_conStr).GetByEmail(User.Identity.Name).Id;
    }
}
