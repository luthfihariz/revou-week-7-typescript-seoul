export {};

// ============================================================
// Lecture 1 — Slides 34–35
// Arrays
// ============================================================
// Array type = a collection of values of the same type.
// Syntax: type[]
// ============================================================

// --- Typed arrays ---
let names: string[] = ['Mary', 'Jane', 'Peter', 'Parker', 'May', "Eddy", "Brooke"];
console.log(names);

// Array methods still work:
names.push('Harry Osborn'); // OK — string pushed to string[]
console.log(names);

// TypeScript prevents wrong types:
// names.push(0);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'

// --- Number arrays ---
let scores: number[] = [95, 82, 78, 91, 88];
scores.push(100); // OK
console.log(scores);

// --- Boolean arrays ---
let flags: boolean[] = [true, false, true, true];
console.log(flags);

// --- Mixed types with union arrays ---
// When you need both strings AND numbers in one array:
let mixed: (string | number)[] = ['JavaScript', 100, 'RevoU', 40];
mixed.push("TypeScript"); // OK
mixed.push(99);           // OK
// mixed.push(true);      // Error: boolean not in (string | number)
console.log(mixed);

// --- Array of objects ---
let students: { name: string; score: number }[] = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 82 },
  { name: "Carol", score: 91 },
];
console.log(students);

// Access and update:
console.log(students[0].name); // Alice
students[0].score = 98;
console.log(students);
