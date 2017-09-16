<template>
  <div class="ability-scores" v-if="abilityScores">
    <ability-score
      ability-name="Strength"
      :ability="abilityScores.strength"
      />
    <ability-score
      ability-name="Dexterity"
      :ability="abilityScores.dexterity"
      />
    <ability-score
      ability-name="Constitution"
      :ability="abilityScores.constitution"
      />
    <ability-score
      ability-name="Intelligence"
      :ability="abilityScores.intelligence"
      />
    <ability-score
      ability-name="Wisdom"
      :ability="abilityScores.wisdom"
      />
    <ability-score
      ability-name="Charisma"
      :ability="abilityScores.charisma"
      />
  </div>
</template>

<script>
import AbilityScore from './AbilityScore';

export default {
  name: 'ability-scores',
  components: {
    AbilityScore,
  },

  props: {
    abilityScores: {
      type: Object,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ability-scores {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
