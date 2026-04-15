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
let counter;
counter = 1; // OK — number assigned to number
// counter = "RevoU"; // Error: Type 'string' is not assignable to type 'number'
// --- Declare and assign in one line ---
let name = "Yuhuu";
let age = 25;
let active = true;
console.log(name, age, active);
// --- More realistic examples ---
let username = "alice123";
let score = 98.5;
let isLoggedIn = false;
let userId;
userId = 42;
// userId = "abc"; // Error: Type 'string' is not assignable to type 'number'
console.log(username, score, isLoggedIn, userId);
// --- Constants ---
const MAX_RETRIES = 3;
const APP_NAME = "RevoU App";
console.log(APP_NAME, "max retries:", MAX_RETRIES);
export {};
// --- Key takeaway ---
// Once a type is annotated, TypeScript enforces it forever.
// Assign the wrong type → red underline in your editor, error at compile time.
