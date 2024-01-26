# Assignment 2 -- Modules

## Goal

The goal of this assignment is to test your understanding of modules, and to implement some basic functions using the different module types.

## Instructions

Create a new branch for this assignment, branching from the main branch.

You will need to conduct the following steps twice, one for CJS format and the other for ESM.

Create two files, index.js and calculate.js under the assignment 2 folder in a subfolder for each Module Type. In total there should be four files with the following structure:

```Bash
assignment2/ejs/index.js
assignment2/ejs/calculate.js
assignment2/cjs/index.js
assignment2/cjs/calculate.js
```

In calculate.js, implement the following functions:

```Javascript
calculateArea(length, width);

calculateVolume(length, width, height);

calculateSquare(length);
```

Ensure the above functions are exported using the module loading technique being used (CJS or ESM).

In index.js, import the above functions, and run them with the following calls:

```Javascript
console.log(calculateArea(4, 2)); // 8

console.log(calculateVolume(2, 2, 2)); // 8

console.log(calculateSquare(4)); // 16
```

Create a README file with instructions on how to run the index.js file

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all four files + the README.

Submit a link to that PR and the commit ID in the assignment submission box.
