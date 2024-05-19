using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FavoriteBooksManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class ColumnNameUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "HashPassword");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "FavoriteBooks",
                newName: "CoverImage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HashPassword",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "CoverImage",
                table: "FavoriteBooks",
                newName: "Image");
        }
    }
}
