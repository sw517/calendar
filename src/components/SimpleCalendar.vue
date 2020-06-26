<template>
  <div class="calendar">
    <div class="calendar-header">
      <button
        :disabled="isPrevMonthDisabled"
        @click="onChangeMonthBtnClick(-1)"
        class="calendar-btn calendar-btn--prev"
      >
        &lt;
      </button>
      <select v-model="viewMonth" @change="onMonthSelect">
        <option v-for="month in months" :key="month.index" :value="month.index">
          {{ month.name }}
        </option>
      </select>
      <select v-model="viewYear" @change="onYearSelect">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <button
        :disabled="isNextMonthDisabled"
        @click="onChangeMonthBtnClick(1)"
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
      viewMonth: null,
      viewYear: null,
      days: [
        { short: 'Sun', long: 'Sunday' },
        { short: 'Mon', long: 'Monday' },
        { short: 'Tue', long: 'Tuesday' },
        { short: 'Wed', long: 'Wednesday' },
        { short: 'Thu', long: 'Thursday' },
        { short: 'Fri', long: 'Friday' },
        { short: 'Sat', long: 'Saturday' },
      ],
      months: [
        { index: 0, name: 'January' },
        { index: 1, name: 'February' },
        { index: 2, name: 'March' },
        { index: 3, name: 'April' },
        { index: 4, name: 'May' },
        { index: 5, name: 'June' },
        { index: 6, name: 'July' },
        { index: 7, name: 'August' },
        { index: 8, name: 'September' },
        { index: 9, name: 'October' },
        { index: 10, name: 'November' },
        { index: 11, name: 'December' },
      ],
      minYear: 1900,
      maxYear: 2100,
    };
  },
  computed: {
    years() {
      const yrs = [];

      for (let i = this.minYear; i <= this.maxYear; i += 1) {
        yrs.push(i);
      }
      return yrs;
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
    isPrevMonthDisabled() {
      return this.viewMonth === 0 && this.viewYear === this.minYear;
    },
    isNextMonthDisabled() {
      return this.viewMonth === 11 && this.viewYear === this.maxYear;
    },
  },
  watch: {
    viewStartDate() {
      this.viewMonth = this.viewStartDate.getMonth();
      this.viewYear = this.viewStartDate.getFullYear();
    },
  },
  created() {
    this.setViewStartDate(this.getCurrentDate());
  },
  methods: {
    /**
     * Set the value to `viewStartDate` to be the first
     * day of the given month in the date parameter.
     * @param {Date} date A date used to set the calendar view.
     */
    setViewStartDate(date) {
      const month = date.getMonth();
      const year = date.getFullYear();
      this.viewStartDate = new Date(year, month, 1);
    },
    /**
     * Return the current date.
     * @return {Date} The current date.
     */
    getCurrentDate() {
      return new Date();
    },
    /**
     * Return the English name of the month from a date.
     * @param {Date} date The date to get the month from.
     * @return {string} Name of month from date.
     */
    getFullMonthFromDate(date) {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    },
    /**
     * Increment or decement the date given by 1 month
     * depending on the value of the increment parameter.
     * @param {number} increment The number to increment or decrement the month.
     * @param {Date} date The given date to be changed.
     * @return {Date} The modified date.
     */
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
    /**
     * Compares a date generated by the parameters with
     * the current day and returns true if the date is the
     * same.
     * @param {number} day The day index of the compared date.
     * @param {number} month The month index of the compared date.
     * @param {number} year The full year of the compared date.
     * @return {boolean} True if the compared day is today.
     */
    isCurrentDay(day, month, year) {
      const checkedDay = new Date(year, month, day);
      const today = this.getCurrentDate();

      return checkedDay.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    },
    /**
     * Sets a new date in the calendar view based on
     * the result from calling `getPrevOrNextMonth()`.
     * @param {number} increment Value to increment or decrement the current month.
     */
    onChangeMonthBtnClick(increment) {
      this.setViewStartDate(
        this.getPrevOrNextMonth(increment, this.viewStartDate),
      );
    },
    /**
     * Sets a new date in the calendar view based on
     * the value of the month select dropdown.
     * @param {object} e The event triggered on input change.
     */
    onMonthSelect(e) {
      this.setViewStartDate(new Date(this.viewYear, e.target.value, 1));
    },
    /**
     * Sets a new date in the calendar view based on
     * the value of the year select dropdown.
     * @param {object} e The event triggered on input change.
     */
    onYearSelect(e) {
      this.setViewStartDate(new Date(e.target.value, this.viewMonth, 1));
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
