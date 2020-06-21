<template>
  <div id="app">
    <SimpleCalendar />
  </div>
</template>

<script>
import SimpleCalendar from './components/SimpleCalendar.vue';

export default {
  name: 'App',
  components: { SimpleCalendar },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
