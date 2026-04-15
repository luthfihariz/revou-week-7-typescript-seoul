export {};

// ============================================================
// Lecture 1 — Slides 24–25
// Type Annotations
// ============================================================
// Type annotation = you explicitly tell TypeScript the type
// Syntax:  let variableName: type;
//          let variableName: type = value;
//          const constantName: type = value;
// ============================================================

// --- Declare first, assign later ---
let counter: number;
counter = 1;       // OK — number assigned to number
// counter = "RevoU"; // Error: Type 'string' is not assignable to type 'number'

// --- Declare and assign in one line ---
let name: string = "Yuhuu";
let age: number = 25;
let active: boolean = true;

console.log(name, age, active);

// --- More realistic examples ---

let username: string = "alice123";
let score: number = 98.5;
let isLoggedIn: boolean = false;
let userId: number;

userId = 42;
// userId = "abc"; // Error: Type 'string' is not assignable to type 'number'

console.log(username, score, isLoggedIn, userId);

// --- Constants ---
const MAX_RETRIES: number = 3;
const APP_NAME: string = "RevoU App";

console.log(APP_NAME, "max retries:", MAX_RETRIES);

// --- Key takeaway ---
// Once a type is annotated, TypeScript enforces it forever.
// Assign the wrong type → red underline in your editor, error at compile time.
