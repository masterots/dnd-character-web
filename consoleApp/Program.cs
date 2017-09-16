using System;
using System.Linq;
using consoleApp.Sqlite.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace consoleApp.Sqlite
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new DnDContext())
            {
                // foreach (var gear in db.AdventuringGear)
                // {
                //     Console.WriteLine(" - {0}", gear.Name);
                // }
                // foreach (var weaponType in db.WeaponTypes)
                // {
                //     Console.WriteLine(" - {0}", weaponType.Name);
                // }

                // var weapons = db.Weapons.Include(w => w.WeaponType);
                // foreach (Weapon weapon in weapons)
                // {
                //     Console.WriteLine("Name: {0}", weapon.Name);
                //     Console.WriteLine("Type: {0}", weapon.WeaponType?.Name);
                //     Console.WriteLine("Cost: {0} {1}", weapon.Cost, weapon.CostType);
                //     Console.WriteLine("Damage: {0} {1}", weapon.Damage, weapon.DamageType);
                //     Console.WriteLine("Weight: {0} lbs", weapon.Weight);
                //     Console.WriteLine("Modified damage: {0}", weapon.ModifiedDamage);
                //     Console.WriteLine("Range: {0}", weapon.Range);
                //     Console.WriteLine("===========================");
                // }

                var weapons = db.WeaponProperties.Where(w => w.WeaponPropertyType.Name == "Thrown").Include(w => w.WeaponPropertyType).Include(w => w.Weapon);
                // foreach (WeaponProperty weapon in weapons)
                // {
                //     Console.WriteLine("Name: {0}", weapon.Weapon.Name);
                //     Console.WriteLine("Type: {0}", weapon.Weapon.WeaponType?.Name);
                //     Console.WriteLine("Cost: {0} {1}", weapon.Weapon.Cost, weapon.Weapon.CostType);
                //     Console.WriteLine("Damage: {0} {1}", weapon.Weapon.Damage, weapon.Weapon.DamageType);
                //     Console.WriteLine("Weight: {0} lbs", weapon.Weapon.Weight);
                //     Console.WriteLine("Weapon Property: {0}", weapon.WeaponPropertyType.Name);
                //     Console.WriteLine("Modified damage: {0}", weapon.ModifiedDamage);
                //     Console.WriteLine("Range: {0}", weapon.Range);

                //     Console.WriteLine("===========================");
                // }

                // Console.WriteLine("Length: {0}", weapons.CountAsync().Result);
                Console.WriteLine(JsonConvert.SerializeObject(weapons));
            }
        }
    }
}
