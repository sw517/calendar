<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Calendar</router-link> |
      <router-link to="/pizza">Pizzaria Solution</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.mb-10 {
  margin-bottom: 10px;
}

.mt-20 {
  margin-top: 20px;
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

.max-width-400 {
  max-width: 400px;
}
</style>
