using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FavoriteBooksManager.Data
{
    public class BooksRepository
    {
        private readonly string _connectionString;

        public BooksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<FavoriteBook> Get(int userId)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Where(b => b.UserId == userId).ToList();
        }

        public List<string> GetFavoriteBooksKeys(int userId)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Where(b => b.UserId == userId).Select(b => b.Key).ToList();
        }

        public List<FavoriteBook> GetTopFavorites(int limit)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks
                .GroupBy(b => b.Key)
                .OrderByDescending(b => b.Count())
                .Take(limit)
                .Select(b => b.First()).ToList();
        }

        public int? GetId(string key)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.FirstOrDefault(b => b.Key == key)?.Id;
        }

        public void Insert(FavoriteBook book)
        {
            using var context = new BooksDataContext(_connectionString);
            context.FavoriteBooks.Add(book);
            context.SaveChanges();
        }

        public void UpdateBookNote(int id, string notes)
        {
            using var context = new BooksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE FavoriteBooks SET Notes = {notes} WHERE Id = {id}");
        }

        public void Delete(int id)
        {
            using var context = new BooksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM FavoriteBooks WHERE Id = {id}");
        }

        public bool IsUsersBook(int userId, int bookId)
        {
            using var context = new BooksDataContext(_connectionString);
            return context.FavoriteBooks.Any(b => b.UserId == userId && b.Id == bookId);
        }
    }
}
