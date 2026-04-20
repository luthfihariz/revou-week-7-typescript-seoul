export {};

// ============================================================
// Lecture 1 — Slide 30
// String Type
// ============================================================
// TypeScript uses `string` for text data.
// Three ways to write strings: single quotes, double quotes, backticks.
// ============================================================

// --- Single and double quotes (same thing) ---
let firstName: string = 'Peter';
let title: string = "Full Snack Developer";

console.log(firstName, title);

// --- Template literals (backticks) ---
// Can span multiple lines and embed expressions with ${}
let description = `I love coding and snack`;
console.log(description);

// --- String interpolation with ${} ---
let profile: string = `I'm ${firstName}. I'm a ${title}`;
console.log(profile); // I'm Peter. I'm a Full Snack Developer

// --- More interpolation examples ---
let studentName: string = "Alice";
let score: number = 95;
let passed: boolean = true;

let report = `Student: ${studentName}
Score: ${score}
Passed: ${passed}`;

console.log(report);

// --- String is enforced ---
let city: string = "Seoul";
// city = 123; // Error: Type 'number' is not assignable to type 'string'

// --- Useful string methods still work ---
console.log(firstName.toUpperCase());           // PETER
console.log(title.toLowerCase());               // full snack developer
console.log(profile.includes("Peter"));         // true
console.log(description.replace("snack", "TypeScript")); // I love coding and TypeScript
