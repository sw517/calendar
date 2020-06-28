<template>
  <div id="app">
    <SimpleCalendar class="max-width-700 ml-auto mr-auto" />
    <Pizzaria />
  </div>
</template>

<script>
import SimpleCalendar from './components/SimpleCalendar.vue';
import Pizzaria from './components/Pizzaria.vue';

export default {
  name: 'App',
  components: { SimpleCalendar, Pizzaria },
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

.mr-auto {
  margin-right: auto;
}

.ml-auto {
  margin-left: auto;
}

.max-width-700 {
  max-width: 700px;
}
</style>
