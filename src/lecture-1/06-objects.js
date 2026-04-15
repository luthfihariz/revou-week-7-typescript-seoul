// ============================================================
// Lecture 1 — Slides 32–33
// Object Types
// ============================================================
// Object type = describes the SHAPE of an object —
// what properties it has and what types those properties are.
// ============================================================
// --- Two-step: declare type, then assign value ---
let employee;
employee = {
    name: "Peter Parker",
    age: 17,
};
console.log(employee);
// Wrong type on a property:
// employee = { name: "Peter Parker", age: "seventeen" };
// Error: Type 'string' is not assignable to type 'number'
// Missing property:
// employee = { name: "Peter Parker" };
// Error: Property 'age' is missing
// --- Combined: declare type + assign value in one statement ---
let student = {
    name: "Peter Parker",
    age: 17,
};
console.log(student);
// --- More realistic object examples ---
let product = {
    id: 1,
    name: "Laptop",
    price: 15_000_000,
    inStock: true,
};
console.log(product);
let userProfile = {
    username: "alice123",
    email: "alice@example.com",
    age: 25,
    isPremium: false,
};
console.log(userProfile);
// You can update properties — types are still enforced:
userProfile.age = 26; // OK
// userProfile.age = "twenty-six"; // Error
console.log("Updated age:", userProfile.age);
export {};
