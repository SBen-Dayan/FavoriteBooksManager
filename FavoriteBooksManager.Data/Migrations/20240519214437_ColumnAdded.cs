using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FavoriteBooksManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class ColumnAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Key",
                table: "FavoriteBooks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "FavoriteBooks");
        }
    }
}
