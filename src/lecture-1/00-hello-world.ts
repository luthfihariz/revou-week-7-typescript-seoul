export {};

// ============================================================
// Lecture 1 — Slide 21
// Hello World in TypeScript + How to Compile
// ============================================================
//
// HOW TO RUN THIS FILE:
//
//   Step 1 — Compile TypeScript to JavaScript:
//     tsc 00-hello-world.ts
//
//   Step 2 — Run the compiled output:
//     node 00-hello-world.js
//
//   Or run both in one line:
//     tsc 00-hello-world.ts && node 00-hello-world.js
//
// After Step 1, TypeScript creates a new file: 00-hello-world.js
// Open it to see — all the type annotations are GONE.
// The browser and Node.js only ever see the plain .js file.
// ============================================================

// Our first TypeScript program, which just a JS code to prove that JS code is valid TS code
const message = "Hello, World!";
console.log(message);

// A typed function
function greet(name: string){
  return `Hello, ${name}! Welcome to TypeScript.`;
}

console.log(greet("RevoU Students"));