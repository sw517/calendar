<template>
  <div class="calendar">
    <div class="calendar-heading">
      {{ calendarHeading }}
    </div>
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
      viewDate: null,
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
  computed: {
    calendarHeading() {
      return `${this.getMonth(this.viewDate)} ${this.getYear(this.viewDate)}`;
    },
  },
  created() {
    this.setViewDate(this.getCurrentDate());
  },
  methods: {
    setViewDate(date) {
      this.viewDate = date;
    },
    getCurrentDate() {
      return new Date();
    },
    getYear(date) {
      return date.getFullYear();
    },
    getMonth(date) {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    },
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
