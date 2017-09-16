using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using consoleApp.Sqlite.Models;

namespace consoleApp.Sqlite
{
    public class DnDContext : DbContext
    {
        public DbSet<AdventuringGear> AdventuringGear { get; set; }
        public DbSet<WeaponType> WeaponTypes { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<WeaponProperty> WeaponProperties { get; set; }
        public DbSet<WeaponPropertyType> WeaponPropertyTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=../dnd-players-guide-53.db");
        }
    }
}