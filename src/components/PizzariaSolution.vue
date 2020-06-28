<template>
  <div class="p"></div>
</template>

<script>
export default {
  name: 'P',
  created() {
    this.calc();
  },
  methods: {
    calc() {
      // Total available pizza delivery options.
      let highestPizzaCount;
      // Coordinates for block with highest total options.
      let bestPizzaCoords;
      let gridOutput = [];
      const input = [
        [5, 2],
        [3, 3, 2],
        [1, 1, 2],
      ];

      // Grid Size
      const N = input[0][0];
      // Number of Pizzerias
      const M = input[0][1];

      for (let row = 1; row <= 5; row += 1) {
        const rowOutput = [];

        for (let col = 1; col <= N; col += 1) {
          let pizzaCount = 0;
          const coord = [row, col];

          for (let p = 1; p <= M; p += 1) {
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
      console.log(gridOutput);
      console.log('Highest Pizza Count: ', highestPizzaCount);
      console.log('Best Block: ', bestPizzaCoords);
    },
  },
};
</script>
