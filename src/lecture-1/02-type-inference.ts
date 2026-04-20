export {};

// ============================================================
// Lecture 1 — Slides 26–28
// Type Inference
// ============================================================
// Type inference = TypeScript figures out the type FROM the value.
// You don't need to write the type — TypeScript guesses it for you.
// ============================================================

// --- Basic inference ---
// These two lines are IDENTICAL to TypeScript:
let a: number = 0;  // explicit annotation
let b = 0;          // inferred as number — hover over `b` in VS Code!
let c = "Hello"

// TypeScript already knows `b` is a number, so this still errors:
// b = "hello"; // Error: Type 'string' is not assignable to type 'number'

// --- More inference examples ---
let city = "Jakarta";       // inferred: string
let population = 10_000_000; // inferred: number
let isBusy = true;          // inferred: boolean

console.log(city, population, isBusy);

// Try reassigning to wrong type — still an error even without annotation:
// city = 999;  // Error: Type 'number' is not assignable to type 'string'
// ============================================================
// INFERENCE vs ANNOTATION — when to use which?
//
// Type inference              | Type annotations
// ----------------------------|---------------------------
// TypeScript guesses the type | You explicitly tell the type
//
// Use ANNOTATION when:
//   - declaring a variable WITHOUT an initial value
//   - writing function parameters (inference can't help here)
//
// Use INFERENCE when:
//   - you initialize the variable right away
//   - the type is obvious from the value
// ============================================================

// Good: no initial value → annotate
let studentName: string;
studentName = "Alice";

// Good: initialized right away → let TypeScript infer
let studentScore = 95; // no need to write `: number`

console.log(studentName, studentScore);
