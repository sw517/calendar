<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-heading">
        {{ calendarHeading }}
      </div>
    </div>
    <div class="calendar-grid">
      <div
        v-for="(day, i) in days"
        :key="i"
        :title="day.long"
        class="calendar-grid__day calendar-grid__day--heading"
      >
        <span>{{ day.short }}</span>
      </div>
      <div
        v-for="(day, i) in blankDaysInViewMonth"
        :key="i"
        class="calendar-grid__day calendar-grid__day--blank"
      />
      <div
        v-for="(day, i) in totalDaysInViewMonth"
        :key="i"
        class="calendar-grid__day"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleCalendar',
  data() {
    return {
      viewStartDate: null,
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
      if (!this.viewStartDate) return '';

      return `${this.getFullMonthFromDate(
        this.viewStartDate,
      )} ${this.getFullYearFromDate(this.viewStartDate)}`;
    },
    totalDaysInViewMonth() {
      if (!this.viewStartDate) return 0;

      return new Date(
        this.getFullYearFromDate(this.viewStartDate),
        this.viewStartDate.getMonth(),
        0,
      ).getDate();
    },
    blankDaysInViewMonth() {
      if (!this.totalDaysInViewMonth) return 0;

      return this.viewStartDate.getDay() - 1;
    },
  },
  created() {
    this.setViewStartDate(this.getCurrentDate());
  },
  methods: {
    setViewStartDate(date) {
      const month = this.getFullMonthFromDate(date);
      const year = this.getFullYearFromDate(date);
      this.viewStartDate = new Date(`${month} 01, ${year} 00:00:00`);
    },
    getCurrentDate() {
      return new Date();
    },
    getFullYearFromDate(date) {
      return date.getFullYear();
    },
    getFullMonthFromDate(date) {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-box__header {
  display: flex;
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
}

.calendar-grid__day {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(100% / 7);
}
</style>
