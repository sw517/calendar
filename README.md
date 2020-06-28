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

See `/src/components/Pizzaria.vue`.

As I was coding I realised my brief explanation would not run well if
I was to run over the matrix each time for each pizzaria, therefore
I made sure to loop over the pizzarias within the matrix grid loops. This
would have a better Big O notation.

### Task 3: Is there a better solution?

I am sure there is a better solution as my current O notation is at worst
case scenario n^3 if `M` is close to `N`. There is possibly a recursive method
that I cannot think of.
