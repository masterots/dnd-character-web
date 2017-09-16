import {Model} from 'objection';

export default class CharacterClass extends Model {
  // Table name is the only required property.
  static tableName = 'classes';

  static relationMappings = {
    characters: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Character`,
      join: {
        from: 'classes.id',
        through: {
          from: 'characterClasses.classId',
          to: 'characterClasses.characterId'
        },
        to: 'characters.id'
      }
    }
  }
}