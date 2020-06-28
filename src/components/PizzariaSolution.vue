<template>
  <div class="pizzaria-solution">
    <div role="button" class="pizza-button" @click="calc">
      <div v-for="n in 3" :key="n" class="pizza-button__decor" />
      <div class="pizza-button__text">
        Run Solution
      </div>
    </div>
    <div class="pizzaria-solution__io max-width-400 ml-auto mr-auto">
      <div class="pizzaria-solution__io__input">
        <div class="mb-10">INPUT:</div>
        <div v-for="(row, i) in input" :key="`input-row-${i}`">
          <span
            v-for="(col, j) in row"
            :key="`input-col-${i}${j}`"
            class="pizzaria-solution__io__col"
          >
            {{ col }}
          </span>
        </div>
        <div class="mt-20">N = {{ N }}</div>
        <div>M = {{ M }}</div>
      </div>
      <div
        v-if="gridOutput.length > 0"
        class="pizzaria-solution__io__output mt-20"
      >
        <div class="mb-10">OUTPUT:</div>
        <div v-for="(row, i) in gridOutput" :key="`input-row-${i}`">
          <span
            v-for="(col, j) in row"
            :key="`input-col-${i}${j}`"
            class="pizzaria-solution__io__col"
          >
            {{ col }}
          </span>
        </div>
        <div class="mt-20">Best Block: {{ bestPizzaCoords }}</div>
        <div>Total Delivery Options: {{ highestPizzaCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PizzeriaSolution',
  data() {
    return {
      input: [
        [5, 2],
        [3, 3, 2],
        [1, 1, 2],
      ],
      gridOutput: [],
      highestPizzaCount: '',
      bestPizzaCoords: [],
      N: '',
      M: '',
    };
  },
  methods: {
    calc() {
      // Total available pizza delivery options.
      let highestPizzaCount;
      // Coordinates for block with highest total options.
      let bestPizzaCoords;
      let gridOutput = [];
      let { input } = this;

      // Grid Size
      this.N = input[0][0];
      // Number of Pizzerias
      this.M = input[0][1];

      for (let row = 1; row <= this.N; row += 1) {
        const rowOutput = [];

        for (let col = 1; col <= this.N; col += 1) {
          let pizzaCount = 0;
          const coord = [row, col];

          for (let p = 1; p <= this.M; p += 1) {
            const pizzaCoord = [input[p][0], input[p][1]];
            // Max distance that pizza will be delivered.
            const R = input[p][2];
            // Distance between current coordinate and pizzaria.
            const dist =
              Math.abs(pizzaCoord[0] - coord[0]) +
              Math.abs(pizzaCoord[1] - coord[1]);

            if (dist <= R) {
              pizzaCount += 1;
            }
          }

          rowOutput.push(pizzaCount);

          if (!highestPizzaCount || highestPizzaCount < pizzaCount) {
            highestPizzaCount = pizzaCount;
            bestPizzaCoords = coord;
          }
        }
        gridOutput.unshift(rowOutput);
      }
      this.gridOutput = gridOutput;
      this.highestPizzaCount = highestPizzaCount;
      this.bestPizzaCoords = bestPizzaCoords;
    },
  },
};
</script>

<style lang="scss" scoped>
.pizza-button {
  display: inline-block;
  background-color: #ece61e;
  border: 10px solid #9e8732;
  color: #981414;
  border-radius: 999px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  will-change: transform;
  transform-origin: center;
  transition: transform ease 0.5s;
  position: relative;

  &__text {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-weight: 700;
    height: 80px;
    width: 80px;
    padding: 5px;
    box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.2);
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }

  &__decor {
    position: absolute;
    background-color: #981414;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    top: 12px;
    left: 25px;

    & + & {
      top: 30px;
      left: 70px;
    }

    & + & + & {
      top: 70px;
      left: 40px;
    }
  }

  &:hover {
    transform: rotate(10deg);
  }
}

.pizzaria-solution__io {
  text-align: left;
  margin-top: 20px;

  &__col {
    display: inline-flex;
    width: 20px;
  }
}
</style>
