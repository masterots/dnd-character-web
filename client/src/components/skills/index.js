import { connect } from 'vuex-connect';
import Skills from './SkillsList';

export default connect({
  gettersToProps: {
    skills: 'skills',
  },
})('skills', Skills);
