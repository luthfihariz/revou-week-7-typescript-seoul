export {};
// ============================================================
// Lecture 1 — The Real Pain in JavaScript
// Before we learn TypeScript, let's feel WHY it exists.
// Run: node src/lecture-1/00-js-pain.ts
// ============================================================

// ============================================================
// THE SETUP — looks innocent when you're learning
// ============================================================

// In JavaScript, functions take ANY value. No rules.
// This feels fine in a tutorial...

// JavaScript version (no types):
// function getUser(user) {
//   return user.name.toUpperCase();
// }

// TypeScript lets us simulate JavaScript by using 'any' —
// it turns off type checking, just like plain JS.
function getUser(user: any) {
  return user.name.toUpperCase();
}

// ============================================================
// THE PROBLEMS — what happens in real projects
// ============================================================

// Problem 1: user might be null
// (API returns null when user is not found)
//
// getUser(null)
// 💥 TypeError: Cannot read properties of null (reading 'name')

// Problem 2: name might be missing
// (teammate forgot to include the field, or API changed)
//
// getUser({ age: 25 })
// 💥 TypeError: Cannot read properties of undefined (reading 'toUpperCase')

// Problem 3: API response shape changed
// (backend renamed 'name' to 'fullName' — nobody told you)
//
// getUser({ fullName: "Budi", age: 25 })
// 💥 Silently returns undefined.toUpperCase() — crashes at runtime

// Problem 4: teammate passed the wrong type entirely
//
// getUser("just a string")
// 💥 TypeError: user.name is undefined

// ============================================================
// LET'S ACTUALLY RUN THE CRASHES
// ============================================================

console.log("========== THE JAVASCRIPT PAIN ==========\n");

// --- Crash 1: null ---
console.log("--- Crash 1: user is null ---");
try {
  const result = getUser(null);
  console.log(result);
} catch (e: any) {
  console.log("💥 Error:", e.message);
  console.log("   Discovered at runtime — not during coding.\n");
}

// --- Crash 2: missing field ---
console.log("--- Crash 2: 'name' field is missing ---");
try {
  const result = getUser({ age: 25 });
  console.log(result);
} catch (e: any) {
  console.log("💥 Error:", e.message);
  console.log("   Discovered at runtime — not during coding.\n");
}

// --- Crash 3: wrong type ---
console.log("--- Crash 3: wrong type passed ---");
try {
  const result = getUser("just a string");
  console.log(result);
} catch (e: any) {
  console.log("💥 Error:", e.message);
  console.log("   Discovered at runtime — not during coding.\n");
}

// ============================================================
// THE TYPESCRIPT FIX — catch errors BEFORE you run
// ============================================================

console.log("========== THE TYPESCRIPT FIX ==========\n");

// Define what a User MUST look like
interface User {
  name: string;
  age: number;
}

// TypeScript now enforces the contract
function getUserSafe(user: User): string {
  return user.name.toUpperCase();
}

// ❌ These would be caught by TypeScript at compile time —
//    red underline in your editor, BEFORE you even run the code:
//
// getUserSafe(null);
// ❌ Error: Argument of type 'null' is not assignable to parameter of type 'User'
//
// getUserSafe({ age: 25 });
// ❌ Error: Property 'name' is missing in type '{ age: number }'
//
// getUserSafe("just a string");
// ❌ Error: Argument of type 'string' is not assignable to parameter of type 'User'

// ✅ Only a valid User object gets through:
const user: User = { name: "Budi", age: 25 };
console.log("✅ Safe call:", getUserSafe(user));

console.log("\n--- The difference ---");
console.log("  JavaScript: crashes at 2AM in production");
console.log("  TypeScript: red underline in your editor at 2PM");
console.log("\n==========================================");

// ============================================================
// THE SUMMARY
// ============================================================
//
// JavaScript              TypeScript
// ─────────────────────── ──────────────────────────────────
// No types                Types defined by you
// Errors at runtime       Errors at compile time (in editor)
// Teammate passes wrong   TypeScript refuses to compile
//   data → silent bug     → you fix it before it ships
// API changes shape       Your code turns red immediately
//   → crash in prod       → you update types and fix
//
// TypeScript doesn't make you write more code.
// It makes you write SAFER code — and saves you from debugging
// errors that should never have reached production.
