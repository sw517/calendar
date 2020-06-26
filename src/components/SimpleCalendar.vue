<template>
  <div class="calendar">
    <div class="calendar-header">
      <button
        @click="handleBtnClick(-1)"
        class="calendar-btn calendar-btn--prev"
      >
        &lt;
      </button>
      <div class="calendar-heading">
        {{ calendarHeading }}
      </div>
      <button
        @click="handleBtnClick(1)"
        class="calendar-btn calendar-btn--next"
      >
        &gt;
      </button>
    </div>
    <div class="calendar-grid">
      <div
        v-for="day in days"
        :key="day.long"
        :title="day.long"
        class="calendar-grid__day calendar-grid__day--heading"
      >
        <span>{{ day.short }}</span>
      </div>
      <div
        v-for="(day, i) in blankDaysInViewMonth"
        :key="`blank-day-${i}`"
        class="calendar-grid__day calendar-grid__day--blank"
      />
      <div
        v-for="(day, i) in totalDaysInViewMonth"
        :key="`day-${i}`"
        class="calendar-grid__day"
        :class="{
          'calendar-grid__day--active': isCurrentDay(
            i + 1,
            viewStartDate.getMonth(),
            viewStartDate.getFullYear(),
          ),
        }"
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
      )} ${this.viewStartDate.getFullYear()}`;
    },
    totalDaysInViewMonth() {
      if (!this.viewStartDate) return 0;

      return new Date(
        this.viewStartDate.getFullYear(),
        this.viewStartDate.getMonth() + 1,
        0,
      ).getDate();
    },
    blankDaysInViewMonth() {
      if (!this.totalDaysInViewMonth) return 0;

      return this.viewStartDate.getDay();
    },
  },
  created() {
    this.setViewStartDate(this.getCurrentDate());
  },
  methods: {
    setViewStartDate(date) {
      const month = date.getMonth();
      const year = date.getFullYear();
      this.viewStartDate = new Date(year, month, 1);
    },
    getCurrentDate() {
      return new Date();
    },
    getFullMonthFromDate(date) {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    },
    handleBtnClick(increment) {
      this.setViewStartDate(
        this.getPrevOrNextMonth(increment, this.viewStartDate),
      );
    },
    getPrevOrNextMonth(increment, date) {
      let newMonth, newYear;
      const currMonth = date.getMonth();
      const currYear = date.getFullYear();

      if (currMonth === 0 && increment === -1) {
        newMonth = 11;
        newYear = currYear - 1;
      } else if (currMonth === 11 && increment === 1) {
        newMonth = 0;
        newYear = currYear + 1;
      } else {
        newMonth = currMonth + increment;
        newYear = currYear;
      }

      return new Date(newYear, newMonth, 1);
    },
    isCurrentDay(day, month, year) {
      const checkedDay = new Date(year, month, day);
      const today = this.getCurrentDate();

      return checkedDay.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
}

.calendar-grid__day {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(100% / 7);

  &--active {
    background: yellow;
  }
}
</style>
