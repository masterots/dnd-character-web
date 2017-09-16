import {Model} from 'objection';

export default class Weapon extends Model {
  // Table name is the only required property.
  static tableName = 'weapons';

  static relationMappings = {
    characters: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Character`,
      join: {
        from: 'weapons.id',
        through: {
          from: 'characterWeapons.weaponId',
          to: 'characterWeapons.characterId'
        },
        to: 'characters.id'
      }
    }
  }
}