<template>
  <div class="calendar">
    <div class="calendar-wrap">
      <div class="calendar-header">
        <div class="calendar-header__current-date-container">
          <div class="calendar-header__current-date">
            {{
              formatDate(
                getCurrentDate().getDate(),
                getCurrentDate().getMonth(),
                getCurrentDate().getFullYear(),
              )
            }}
          </div>
          <transition name="fade-in-left">
            <button
              v-show="viewStartDate && !isCurrentMonth"
              class="calendar-btn calendar-btn--today"
              @click="onCurrentDayBtnClick"
            >
              View today
            </button>
          </transition>
        </div>
        <div class="calendar-header__controls">
          <div class="calendar-header__controls__selects">
            <select
              v-model="viewMonth"
              class="calendar-select"
              @change="onMonthSelect"
            >
              <option
                v-for="month in months"
                :key="month.index"
                :value="month.index"
              >
                {{ month.name }}
              </option>
            </select>
            <select
              v-model="viewYear"
              class="calendar-select"
              @change="onYearSelect"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="calendar-header__controls__btns">
            <button
              :disabled="isPrevMonthDisabled"
              @click="onChangeMonthBtnClick(-1)"
              class="calendar-btn calendar-btn--prev"
            >
              &lt;
            </button>
            <button
              :disabled="isNextMonthDisabled"
              @click="onChangeMonthBtnClick(1)"
              class="calendar-btn calendar-btn--next"
            >
              &gt;
            </button>
          </div>
        </div>
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
          role="button"
          :title="formatDate(day, viewMonth, viewYear)"
          class="calendar-grid__day"
          :class="{
            'calendar-grid__day--active': isCurrentDay(day),
            'calendar-grid__day--selected': isSelectedDay(day),
          }"
          @click="onCalendarDayClick(day)"
        >
          <span class="calendar-grid__day__text">{{ day }}</span>
        </div>
      </div>
    </div>
    <transition name="fade-in-down">
      <div v-show="selectedDate" class="calendar__selected">
        <span class="calendar__selected-inner">
          {{ selectedDate }}
        </span>
      </div>
    </transition>
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
      selectedDate: null,
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
    isCurrentMonth() {
      const currDate = new Date();
      const currMonth = currDate.getMonth();
      const currYear = currDate.getFullYear();
      return currMonth === this.viewMonth && currYear === this.viewYear;
    },
  },
  watch: {
    viewStartDate() {
      this.viewMonth = this.viewStartDate.getMonth();
      this.viewYear = this.viewStartDate.getFullYear();
      this.selectedDate = null;
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
     * @return {boolean} True if the compared day is today.
     */
    isCurrentDay(day) {
      const checkedDay = new Date(this.viewYear, this.viewMonth, day);
      const today = this.getCurrentDate();

      return checkedDay.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    },
    /**
     * Checks if the day in the calendar view is currently
     * selected.
     * @param {number} day The day index of the compared date.
     * @return {boolean} True if the compared day is today.
     */
    isSelectedDay(day) {
      if (!this.selectedDate) return null;

      const checkedDay = new Date(this.viewYear, this.viewMonth, day);
      const selected = new Date(this.selectedDate);

      return checkedDay.setHours(0, 0, 0, 0) === selected.setHours(0, 0, 0, 0);
    },
    /**
     * Formats a date as such: 'Sunday, 28 June 2020'
     * @param {number} day The day index of the date.
     * @param {number} week The month index of the date.
     * @param {number} year The full year of the date.
     */
    formatDate(day, month, year) {
      const date = new Date(year, month, day);
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
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
    /**
     * Sets the calendar view to the current month on
     * clicking the Current Day button.
     */
    onCurrentDayBtnClick() {
      this.setViewStartDate(this.getCurrentDate());
    },
    /**
     * Sets the selectedDate to the day clicked in the
     * calendar on clicking the day.
     * Toggle the selectedDate to null if it has already been clicked.
     * @param {number} day The day index to set selectedDate to.
     */
    onCalendarDayClick(day) {
      if (
        this.selectedDate ===
        this.formatDate(day, this.viewMonth, this.viewYear)
      ) {
        this.selectedDate = null;
      } else {
        this.selectedDate = this.formatDate(day, this.viewMonth, this.viewYear);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #52ad9c;
$secondary-color: #319a87;

.calendar-wrap {
  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 4px;
}

.calendar-header {
  background-color: $primary-color;
  color: #fff;
  padding: 15px;

  @media screen and (min-width: 600px) {
    padding: 20px 30px;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__selects {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__current-date {
    @media screen and (min-width: 600px) {
      font-size: 30px;
    }
  }

  &__current-date-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    @media screen and (min-width: 600px) {
      margin-bottom: 20px;
    }
  }
}

.calendar-select {
  background: none;
  border: 2px solid white;
  border-radius: 999px;
  color: white;
  padding: 5px 8px;
  margin-right: 10px;
  cursor: pointer;
  -webkit-appearance: none;

  option {
    color: initial;
  }

  &:hover {
    background-color: rgba(250, 250, 250, 0.2);
  }

  @media screen and (min-width: 600px) {
    font-size: 16px;
  }
}

.calendar__selected {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;

  &-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    background-color: $primary-color;
    color: #fff;
    border-radius: 999px;
    min-height: 44px;
    min-width: 240px;
  }
}

.calendar-btn {
  background: none;
  border: 2px solid white;
  border-radius: 999px;
  color: white;
  height: 30px;
  min-width: 30px;
  cursor: pointer;

  &:hover {
    background-color: rgba(250, 250, 250, 0.2);
  }

  &--prev {
    margin-right: 10px;
  }
}

.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;

  &__day {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: calc(100% / 7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;

    &--active {
      .calendar-grid__day__text {
        box-shadow: 0 0 0 2px $secondary-color;
      }
    }

    &--selected {
      .calendar-grid__day__text {
        background-color: $primary-color;
        color: #fff;
      }
    }

    &:not(.calendar-grid__day--blank):not(.calendar-grid__day--heading) {
      cursor: pointer;
    }
  }

  &__day__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
  }
}

/*  ================================
    Transitions
    ================================ */

.fade-in-left-enter-active,
.fade-in-left-leave-active {
  transition: opacity ease 0.3s, transform ease 0.3s;
}
.fade-in-left-enter,
.fade-in-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-in-down-enter-active,
.fade-in-down-leave-active {
  transition: opacity ease 0.3s, transform ease 0.3s;
}
.fade-in-down-enter,
.fade-in-down-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
