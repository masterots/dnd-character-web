<template>
  <div>
    <ability-scores></ability-scores>
    <div class="skills-and-tools">
      <div class="armor-class">
        <img class="crest" src="/static/crest2.gif">
        <h2 class="armor-class-title">Armor Class</h2>
        <p class="armor-class-value">{{ character.armorClass }}</p>
      </div>
      <div class="carried-armor">
        <h2>Armor</h2>
        <p v-for="item in armor" :key="item.id">
          {{ item.name }}
        </p>
      </div>
      <skills></skills>
      <weapons></weapons>
    </div>
  </div>
</template>

<script>
import AbilityScores from '@/components/ability-scores';
import Skills from '@/components/skills';
import Weapons from '@/components/weapons';

export default {
  name: 'character',

  components: {
    AbilityScores,
    Skills,
    Weapons,
  },

  props: {
    character: {
      type: Object,
    },
    armor: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.skills-and-tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.armor-class {
  position: relative;
  width: 170px;
}
.armor-class-title {
  position: absolute;
  z-index: 5;
  top: 184px;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
}
.armor-class-value {
  position: absolute;
  z-index: 5;
  top: -30px;
  width: 100%;
  text-align: center;
  font-size: 3.5rem;
}
.crest {
  width: 170px;
  height: 213px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>
