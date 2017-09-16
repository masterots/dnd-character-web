<template>
  <div>
    <h2>Weapons</h2>
    <ul>
      <li
        v-for="weapon in weapons"
        :key="weapon.id"
        :class="{'proficient': weapon.isProficient}"
        :title="weapon.damage">
        {{ weapon.name }} - {{ weapon.amount }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'weapons',

  props: {
    weapons: {
      type: Array,
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: circle;
}
.proficient {
  list-style-type: disc;
}
</style>
