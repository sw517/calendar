<template>
  <div>
    <SimpleCalendar class="max-width-700 ml-auto mr-auto" />
  </div>
</template>

<script>
import SimpleCalendar from '../components/SimpleCalendar.vue';

export default {
  name: 'App',
  components: { SimpleCalendar },
};
</script>

<style lang="scss">
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
