// ============================================================
// Lecture 1 — Slide 31
// Boolean Type
// ============================================================
// Boolean = only two possible values: true or false
// Used for flags, toggles, conditions.
// ============================================================
// --- Basic boolean ---
let isLoading;
isLoading = true;
console.log("Loading:", isLoading); // true
// after a while...
isLoading = false;
console.log("Loading:", isLoading); // false
// --- Common boolean use cases ---
let isLoggedIn = false;
let isAdmin = true;
let hasPermission = false;
let isEmailVerified = true;
console.log(isLoggedIn, isAdmin, hasPermission, isEmailVerified);
// --- Boolean cannot hold other types ---
// isLoggedIn = 1;      // Error: Type 'number' is not assignable to type 'boolean'
// isAdmin = "true";    // Error: Type 'string' is not assignable to type 'boolean'
// --- Boolean in conditions ---
if (isAdmin) {
    console.log("Welcome, admin!");
}
else {
    console.log("Access denied.");
}
// --- Boolean from comparisons ---
let score = 85;
let passed = score >= 70;
console.log("Passed:", passed); // true
let age = 17;
let canVote = age >= 18;
console.log("Can vote:", canVote); // false
export {};
