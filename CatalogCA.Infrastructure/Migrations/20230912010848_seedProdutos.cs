using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatalogCA.Infrastructure.Migrations
{
    public partial class seedProdutos : Migration
    {
        protected override void Up(MigrationBuilder mb)
        {
            mb.Sql("INSERT INTO Products(Name,Description,Price,ImageUrl,Stock,RegisterDate,CategoryId)"+
                    "VALUES('Suco','Suco de fruta da polpa',6.50,'suco.png',100,'2023-05-09',1)");
            mb.Sql("INSERT INTO Products(Name,Description,Price,ImageUrl,Stock,RegisterDate,CategoryId)" +
                    "VALUES('Coca-Cola Diet','Refrigerante de Cola 350 ml',5.45,'cocacola.jpg',50,now(),1)");
            mb.Sql("INSERT INTO Products(Name,Description,Price,ImageUrl,Stock,RegisterDate,CategoryId)" +
                    "VALUES('Calculadora escolar','Calculadora simples',15.39,'calculadora1.jpg',20,'2023-09-08',2)");
            mb.Sql("INSERT INTO Products(Name,Description,Price,ImageUrl,Stock,RegisterDate,CategoryId)" +
                    "VALUES('Biscoito gotas de chocolate','biscoito com gotas e recheio de chocolate',2.30,'gotasdechoco.jpg',120,'2023-09-12',3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
