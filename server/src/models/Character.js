import {Model} from 'objection';
import Armor from './Armor';
import Weapon from './Weapon';
import CharacterClass from './CharacterClass';
import CharacterSkillProficiencies from './CharacterSkillProficiencies';

export default class Character extends Model {
  // Table name is the only required property.
  static tableName = 'characters';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  // static jsonSchema = {
  //   type: 'object',
  //   required: ['firstName', 'lastName'],

  //   properties: {
  //     id: {type: 'integer'},
  //     parentId: {type: ['integer', 'null']},
  //     firstName: {type: 'string', minLength: 1, maxLength: 255},
  //     lastName: {type: 'string', minLength: 1, maxLength: 255},
  //     age: {type: 'number'},

  //     address: {
  //       type: 'object',
  //       properties: {
  //         street: {type: 'string'},
  //         city: {type: 'string'},
  //         zipCode: {type: 'string'}
  //       }
  //     }
  //   }
  // };

  static relationMappings = {
    armor: {
      relation: Model.ManyToManyRelation,
      modelClass: Armor,
      join: {
        from: 'characters.id',
        through: {
          from: 'characterArmor.characterId',
          to: 'characterArmor.armorId'
        },
        to: 'armor.id'
      }
    },
    weapons: {
      relation: Model.ManyToManyRelation,
      modelClass: Weapon,
      join: {
        from: 'characters.id',
        through: {
          from: 'characterWeapons.characterId',
          to: 'characterWeapons.weaponId'
        },
        to: 'weapons.id'
      }
    },
    characterClasses: {
      relation: Model.ManyToManyRelation,
      modelClass: CharacterClass,
      join: {
        from: 'characters.id',
        through: {
          from: 'characterClasses.characterId',
          to: 'characterClasses.classId'
        },
        to: 'classes.id'
      }
    },
    characterSkillProficiencies: {
      relation: Model.HasManyRelation,
      modelClass: CharacterSkillProficiencies,
      join: {
        from: 'characters.id',
        to: 'characterSkillProficiencies.characterId'
      }
    }
  }
  // This object defines the relations to other models.
  // static relationMappings = {
  //   pets: {
  //     relation: Model.HasManyRelation,
  //     // The related model. This can be either a Model subclass constructor or an
  //     // absolute file path to a module that exports one. We use the file path version
  //     // here to prevent require loops.
  //     modelClass: Animal,
  //     join: {
  //       from: 'Character.id',
  //       to: 'Animal.ownerId'
  //     }
  //   },

  //   movies: {
  //     relation: Model.ManyToManyRelation,
  //     modelClass: Movie,
  //     join: {
  //       from: 'Character.id',
  //       // ManyToMany relation needs the `through` object to describe the join table.
  //       through: {
  //         from: 'Character_Movie.CharacterId',
  //         to: 'Character_Movie.movieId'
  //       },
  //       to: 'Movie.id'
  //     }
  //   },

  //   children: {
  //     relation: Model.HasManyRelation,
  //     modelClass: Character,
  //     join: {
  //       from: 'Character.id',
  //       to: 'Character.parentId'
  //     }
  //   },

  //   parent: {
  //     relation: Model.BelongsToOneRelation,
  //     modelClass: Character,
  //     join: {
  //       from: 'Character.parentId',
  //       to: 'Character.id'
  //     }
  //   }
  // };
}
