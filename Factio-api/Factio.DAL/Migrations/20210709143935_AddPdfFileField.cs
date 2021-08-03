using Microsoft.EntityFrameworkCore.Migrations;

namespace Factio.DAL.Migrations
{
    public partial class AddPdfFileField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "pdfFile",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pdfFile",
                table: "Invoices");
        }
    }
}
