import { transaction } from "objection";
import { Model } from "objection";
import Character from "./models/Character";
import Skills from "./models/Skills";
import Weapon from "./models/Weapon";

function calculateArmorClass(
  baseArmorClass = 0,
  baseDexModifier = 0,
  armor = []
) {
  const higherArmor = armor.find(a => a.armorClass > baseArmorClass);
  const startingAc = higherArmor ? higherArmor.armorClass : baseArmorClass;
  let dexterityModifier = baseDexModifier;

  if (!higherArmor) {
    return startingAc + dexterityModifier;
  } else if (higherArmor.armorTypeId === 1) {
    return higherArmor.armorClass + dexterityModifier;
  } else if (higherArmor.armorTypeId === 2) {
    return higherArmor.armorClass + 2;
  } else if (higherArmor.armorTypeId === 3) {
    return higherArmor.armorClass;
  }
}

export default function(router) {
  // Create a new Person. You can pass relations with the person
  // and they also get inserted.
  // router.post('/characters', async (req, res) => {
  //   const character = await Character
  //     .query()
  //     .insertGraph(req.body);

  //   res.send(character);
  // });

  // Patch a Person.
  // router.patch('/characters/:id', async (req, res) => {
  //   const person = await Person
  //     .query()
  //     .patchAndFetchById(req.params.id, req.body);

  //   res.send(person);
  // });

  // Get all Persons. The result can be filtered using query parameters
  // `minAge`, `maxAge` and `firstName`. Relations can be fetched eagerly
  // by giving a relation expression as the `eager` query parameter.
  router.get("/characters", async (req, res) => {
    // We don't need to check for the existence of the query parameters because
    // we call the `skipUndefined` method. It causes the query builder methods
    // to do nothing if one of the values is undefined.
    const characters = await Character.query()
      .eager(req.query.eager)
      .skipUndefined();

    res.send(characters);
  });

  router.get("/characters/:id", async (req, res) => {
    // We don't need to check for the existence of the query parameters because
    // we call the `skipUndefined` method. It causes the query builder methods
    // to do nothing if one of the values is undefined.
    const allSkills = await Skills.query();
    const character = await Character.query()
      .eager('[armor,weapons,characterSkillProficiencies,characterClasses]')
      .findById(req.params.id);

    console.log(character);

    const calculatedAC = calculateArmorClass(
      character.armorClass,
      character.dexterityModifier,
      character.armor
    );

    const mappedSkillsWithProficiencyBonus = () => {
      const computedSkills = allSkills.map(skill => {
        const { proficiencyBonus } = character;
        const proficientSkill = character.characterSkillProficiencies.find(proficiency => skill.id === proficiency.skillId);
        if (proficientSkill) {
          return {
            name: skill.name,
            modifier: character[`${skill.modifier}Modifier`] + proficiencyBonus,
            isProficient: true,
          }
        } else {
          return {
            name: skill.name,
            modifier: character[`${skill.modifier}Modifier`],
          };
        }
      });
      return computedSkills;
    };

    const weaponsWithAmount = () => {
      const computedWeapons = [];
      character.weapons.forEach(weapon => {
        const foundWeaponIndex = computedWeapons.findIndex(w => w.id === weapon.id);
        if (foundWeaponIndex > -1) {
          computedWeapons[foundWeaponIndex].amount += 1;
        } else {
          computedWeapons.push(Object.assign({}, weapon, { amount: 1 }));
        }
      }, this);
      // character.characterClasses.forEach
      return computedWeapons;
    };

    const transformed = {
      id: character.id,
      name: character.name,
      abilityScores: {
        strength: {
          value: character.strength,
          modifier: character.strengthModifier
        },
        dexterity: {
          value: character.dexterity,
          modifier: character.dexterityModifier
        },
        intelligence: {
          value: character.intelligence,
          modifier: character.intelligenceModifier
        },
        constitution: {
          value: character.constitution,
          modifier: character.constitutionModifier
        },
        wisdom: {
          value: character.wisdom,
          modifier: character.wisdomModifier
        },
        charisma: {
          value: character.charisma,
          modifier: character.charismaModifier
        }
      },
      armorClass: calculatedAC,
      speed: character.speed,
      currentHitPoints: character.currentHitPoints,
      temporaryHitPoints: character.temporaryHitPoints,
      money: {
        platinum: character.platinum,
        gold: character.gold,
        electrum: character.electrum,
        silver: character.silver,
        copper: character.copper
      },
      xp: character.xp,
      proficiencyBonus: character.proficiencyBonus,
      items: {
        armor: character.armor,
        weapons: weaponsWithAmount(),
      },
      skills: mappedSkillsWithProficiencyBonus()
    };

    res.send(transformed);
  });

  // Delete a person.
  router.delete("/persons/:id", async (req, res) => {
    await Person.query()
      .delete()
      .where("id", req.params.id);

    res.send({});
  });

  // Add a child for a Person.
  router.post("/persons/:id/children", async (req, res) => {
    const person = await Person.query().findById(req.params.id);

    if (!person) {
      throwNotFound();
    }

    const child = await person.$relatedQuery("children").insert(req.body);

    res.send(child);
  });

  // Add a pet for a Person.
  router.post("/persons/:id/pets", async (req, res) => {
    const person = await Person.query().findById(req.params.id);

    if (!person) {
      throwNotFound();
    }

    const pet = await person.$relatedQuery("pets").insert(req.body);

    res.send(pet);
  });

  // Get a Person's pets. The result can be filtered using query parameters
  // `name` and `species`.
  router.get("/persons/:id/pets", async (req, res) => {
    const person = await Person.query().findById(req.params.id);

    if (!person) {
      throwNotFound();
    }

    // We don't need to check for the existence of the query parameters because
    // we call the `skipUndefined` method. It causes the query builder methods
    // to do nothing if one of the values is undefined.
    const pets = await person
      .$relatedQuery("pets")
      .skipUndefined()
      .where("name", "like", req.query.name)
      .where("species", req.query.species);

    res.send(pets);
  });

  // Add a movie for a Person.
  router.post("/persons/:id/movies", async (req, res) => {
    // Inserting a movie for a person creates two queries: the movie insert query
    // and the join table row insert query. It is wise to use a transaction here.
    const movie = await transaction(Person.knex(), async function(trx) {
      const person = await Person.query(trx).findById(req.params.id);

      if (!person) {
        throwNotFound();
      }

      return person.$relatedQuery("movies", trx).insert(req.body);
    });

    res.send(movie);
  });

  // Add existing Person as an actor to a movie.
  router.post("/movies/:id/actors", async (req, res) => {
    const movie = await Movie.query().findById(req.params.id);

    if (!movie) {
      throwNotFound();
    }

    await movie.$relatedQuery("actors").relate(req.body.id);

    res.send(req.body);
  });

  // Get Movie's actors.
  router.get("/movies/:id/actors", async (req, res) => {
    const movie = await Movie.query().findById(req.params.id);

    if (!movie) {
      throwNotFound();
    }

    const actors = await movie.$relatedQuery("actors");

    res.send(actors);
  });
}

// The error thrown by this function is handled in the error handler middleware in router.js.
function throwNotFound() {
  const error = new Error();
  error.statusCode = 404;
  throw error;
}
