using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace consoleApp.Sqlite.Models
{
    [Table("weaponTypes")]
    public class WeaponType
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
    }

}