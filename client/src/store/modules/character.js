import axios from 'axios';
import * as types from '../mutation-types';

const state = {
  character: {
    id: 0,
    name: '',
    abilityScores: {
      strength: {
        value: 0,
        modifier: 0,
      },
      dexterity: {
        value: 0,
        modifier: 0,
      },
      intelligence: {
        value: 0,
        modifier: 0,
      },
      constitution: {
        value: 0,
        modifier: 0,
      },
      wisdom: {
        value: 0,
        modifier: 0,
      },
      charisma: {
        value: 0,
        modifier: 0,
      },
    },
    armorClass: 0,
    speed: 0,
    currentHitPoints: 0,
    temporaryHitPoints: 0,
    money: {
      platinum: 0,
      gold: 0,
      electrum: 0,
      silver: 0,
      copper: 0,
    },
    xp: 0,
    proficiencyBonus: 0,
    items: {
      armor: [],
      weapons: [],
    },
    skills: [],
  },
};

export const getters = {
  character: state => state.character,
  abilityScores: state => state.character.abilityScores,
  money: state => state.character.money,
  armor: state => state.character.items.armor,
  skills: state => state.character.skills,
  weapons: state => state.character.items.weapons,
};

export const mutations = {
  async [types.GET_CHARACTER_BY_ID](state, { id }) {
    const character = await axios.get(`/characters/${id}`);
    if (character.data && character.data.name) {
      state.character = character.data;
    }
  },
};

export default {
  state,
  getters,
  // actions,
  mutations,
};
