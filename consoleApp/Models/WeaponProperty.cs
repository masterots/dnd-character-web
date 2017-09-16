using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace consoleApp.Sqlite.Models
{
    [Table("weaponProperties")]
    public class WeaponProperty
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("weaponId")]
        public Weapon Weapon { get; set; }

        [Column("weaponPropertyTypeId")]
        public WeaponPropertyType WeaponPropertyType { get; set; }

        [Column("modifiedDamage")]
        public string ModifiedDamage { get; set; }

        [Column("range")]
        public string Range { get; set; }
    }
}