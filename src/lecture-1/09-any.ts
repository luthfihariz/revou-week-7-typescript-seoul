export {};

// ============================================================
// Lecture 1 — Slides 37–38
// The `any` Type
// ============================================================
// `any` tells TypeScript: "skip type checking for this variable"
// It's an escape hatch — use it sparingly.
// ============================================================

// --- When `any` might seem necessary ---
// Imagine data coming from an external API — you don't know its shape yet.

const json = `{"latitude": "6.1754° S", "longitude": "106.8272° E"}`;

// JSON.parse returns `any` because TypeScript can't know the shape
const currentLocation = JSON.parse(json);
console.log(currentLocation); // { latitude: '6.1754° S', longitude: '106.8272° E' }

// With `any`, TypeScript won't stop you from doing ANYTHING:
let value: any = "hello";
value = 42;        // OK
value = true;      // OK
value = { x: 1 }; // OK
value.anything();  // No compile error — but will CRASH at runtime!

// --- Why `any` is dangerous ---

// 1. Type Safety: defeats the whole purpose of TypeScript
let counter: any = 0;
counter = "oops"; // TypeScript doesn't warn you
// counter + 1    → "oops1" (string concatenation, not addition!) — silent bug

// 2. No autocomplete: your editor can't suggest methods
// 3. Debugging: runtime errors become harder to track

// --- The 3 reasons to minimize `any` (from the slides) ---
// Type Safety    → bypasses TypeScript's strong type system
// Compiler Help  → lose autocomplete, error detection, refactoring support
// Debugging      → type mismatches become runtime surprises

// --- Better alternative: be explicit about what you expect ---
const raw = `{"name": "Alice", "score": 95}`;
const parsed = JSON.parse(raw) as { name: string; score: number };
console.log(parsed.name);  // Alice
console.log(parsed.score); // 95

// Key rule: if you reach for `any`, ask yourself first —
// "Can I just write the actual type?"
