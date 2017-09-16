<template>
  <div class="ability-score">
    <h2>{{ abilityName }}</h2>
    <p class="value">{{ ability.value }}</p>
    <p class="modifier">{{ formattedModifier }}</p>
  </div>
</template>

<script>
export default {
  name: 'ability-score',

  props: {
    ability: {
      type: Object,
      default: () => ({ value: 0, modifier: 0 }),
    },
    abilityName: {
      type: String,
    },
  },

  computed: {
    formattedModifier() {
      if (this.ability.modifier < 0) {
        return this.ability.modifier;
      } else if (this.ability.modifier > 0) {
        return `+${this.ability.modifier}`;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.ability-score {
  width: 150px;
  height: 160px;
  text-align: center;
  position: relative;
  border: 2px solid #000;
  border-radius: 20px;
}
h2 {
  font-size: 1rem;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 5;
  text-align: center;
  width: 100%;
  top: 10px;
}
p {
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 5;
  text-align: center;
  width: 100%;
}
.value {
  font-size: 3.5rem;
  top: 30px;
}
.modifier {
  font-size: 1.5rem;
  top: 140px;
  background-color: #FFF;
  border: 2px solid #000;
  border-radius: 40px / 20px;
  height: 40px;
  width: 80px;
  left: 35px;
}
</style>
