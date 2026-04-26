using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Rank.Models;


namespace Rank.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Rank.Models.RankModel", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Grup")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .HasColumnType("longtext");

                    b.HasKey("Email");

                    b.ToTable("rank");
                });
#pragma warning restore 612, 618
        }
    }
}
