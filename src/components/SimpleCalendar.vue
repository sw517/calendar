<template>
  <div class="calendar">
    <div class="calendar-heading">{{ `${activeMonth} ${activeYear}` }}</div>
    <div role="table" class="calendar-table">
      <div role="row" class="calendar-table__row">
        <div
          v-for="(day, i) in days"
          :key="i"
          role="columnheader"
          :title="day.long"
          class="calendar-table__column"
        >
          <span>{{ day.short }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleCalendar',
  data() {
    return {
      activeMonth: 'May',
      activeYear: '2019',
      days: [
        { short: 'Sun', long: 'Sunday' },
        { short: 'Mon', long: 'Monday' },
        { short: 'Tue', long: 'Tuesday' },
        { short: 'Wed', long: 'Wednesday' },
        { short: 'Thu', long: 'Thursday' },
        { short: 'Fri', long: 'Friday' },
        { short: 'Sat', long: 'Saturday' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.calendar-table__row {
  display: flex;
}

.calendar-table__column {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
}
</style>
