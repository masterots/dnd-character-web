import { connect } from 'vuex-connect';
import Character from './Character';

export default connect({
  gettersToProps: {
    character: 'character',
    armor: 'armor',
  },
})('character', Character);
