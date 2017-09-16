import {Model} from 'objection';

export default class Armor extends Model {
  // Table name is the only required property.
  static tableName = 'armor';

  static relationMappings = {
    characters: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Character`,
      join: {
        from: 'armor.id',
        through: {
          from: 'characterArmor.armorId',
          to: 'characterArmor.characterId'
        },
        to: 'characters.id'
      }
    }
  }
}