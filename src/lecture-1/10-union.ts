export {};

// ============================================================
// Lecture 1 — Slide 39
// Union Types
// ============================================================
// Union type = a variable can hold ONE of several types.
// Syntax: type1 | type2
// ============================================================

// --- Basic union ---
let result: number | string;
result = 100;     // OK — it's a number
result = 'Haloo'; // OK — it's a string
// result = false; // Error: Type 'boolean' is not in 'number | string'

console.log(result);

// --- Real-world examples ---

// A user ID might come as a number from a database or a string from a URL
let userId: number | string;
userId = 42;
console.log("Number ID:", userId);
userId = "abc-123";
console.log("String ID:", userId);

// A function result that might be a value or null
let searchResult: string | null = null; // nothing found yet
searchResult = "Alice";                 // found!
console.log("Result:", searchResult);

// --- Union in function parameters ---
function printId(id: number | string): void {
  console.log("ID:", id);
}

printId(101);       // OK
printId("abc-202"); // OK
// printId(true);   // Error: boolean is not in number | string

// --- Union in arrays (from slide 35 too) ---
let data: (string | number)[] = ["Alice", 100, "Bob", 200];
console.log(data);

// --- Three-way union ---
let status: "active" | "inactive" | "pending" = "active";
status = "pending";  // OK
// status = "deleted"; // Error: not one of the three options
console.log(status);
