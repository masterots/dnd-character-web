import * as types from './mutation-types';

export const getCharacterById = ({ commit }, id) => {
  if (id) {
    commit(types.GET_CHARACTER_BY_ID, { id });
  }
};
