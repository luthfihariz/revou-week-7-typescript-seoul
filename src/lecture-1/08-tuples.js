// ============================================================
// Lecture 1 — Slide 36
// Tuples
// ============================================================
// Tuple = an array with a FIXED number of elements
//         where each position has a specific type.
// The ORDER of types matters.
// ============================================================
// --- Basic tuple ---
let skill;
skill = ['Learn', 99]; // OK — string at [0], number at [1]
console.log(skill); // ['Learn', 99]
console.log(skill[0]); // 'Learn'
console.log(skill[1]); // 99
// Order matters — swap the values and it errors:
// skill = [99, 'Learn'];
// Error: Type 'number' is not assignable to type 'string'
// Error: Type 'string' is not assignable to type 'number'
// --- More tuple examples ---
// [id, username]
let user = [1, "alice"];
console.log("User:", user);
// [x, y] coordinate
let point = [10, 20];
console.log("Point:", point);
// [status code, message]
let response = [200, "OK"];
console.log("Response:", response);
// --- Tuple vs Array ---
// Array: all elements same type, any length
let arr = [1, 2, 3, 4, 5]; // flexible length
// Tuple: fixed length, each position has its own type
let record = ["Alice", 25, true]; // exactly 3 elements
// This would error — too many elements:
// let bad: [string, number] = ["Alice", 25, true];
// Error: Source has 3 element(s) but target allows only 2
console.log(arr, record);
export {};
