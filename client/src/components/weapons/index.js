import { connect } from 'vuex-connect';
import Weapons from './WeaponsList';

export default connect({
  gettersToProps: {
    weapons: 'weapons',
  },
})('weapons', Weapons);
