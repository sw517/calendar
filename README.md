# calendar/ Pizzaria Solution

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Pizzaria Tasks

### Task 1: Brief explanation of solution

In order to solve the solution to finding the best block
(the block with the most delivery options), I would create
a matrix for the X/Y coordinates and for each pizzaria, I would
note down if the X/Y coordinate on the grid will be able to have
a delivery. Once I've iterated through all the pizzarias, I would
go through the matrix and see where the deliveries overlap and count
them.

### Task 2: Code the solution

See `/src/components/Pizzaria.vue` for implementation in vue component.

As I was coding I realised my brief explanation would not run well if
I was to run over the matrix each time for each pizzaria, therefore
I made sure to loop over the pizzarias within the matrix grid loops. This
would have a better Big O notation.

### Standard JS function taken from my vue component:
```
function calc() {
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

  for (let row = 1; row <= N; row += 1) {
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
}
```

### Task 3: Is there a better solution?

I am sure there is a better solution as my current O notation is at worst
case scenario n^3 if `M` is close to `N`. There is possibly a recursive method
that I cannot think of.

Also my solution finds the first block with the highest delivery options
available. I could also add the other coordinates of similar blocks to an
array.
