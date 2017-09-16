<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',

  methods: mapActions([
    'getCharacterById',
  ]),

  data() {
    return {
      character: {},
    };
  },

  mounted() {
    this.getCharacterById(1);
  },
};
</script>

<style>

</style>
