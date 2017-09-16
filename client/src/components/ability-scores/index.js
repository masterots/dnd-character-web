import { connect } from 'vuex-connect';
import AbilityScores from './AbilityScores';

export default connect({
  gettersToProps: {
    abilityScores: 'abilityScores',
  },
})('ability-scores', AbilityScores);
