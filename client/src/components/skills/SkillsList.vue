<template>
  <div>
    <h2>Skills</h2>
    <ul>
      <li v-for="skill in skills" :key="skill.name" :class="{'proficient': skill.isProficient}">
        {{ skill.modifier }}
        {{ skill.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'skills',

  props: {
    skills: {
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
