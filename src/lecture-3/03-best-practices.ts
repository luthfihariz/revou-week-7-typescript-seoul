export {};
// ============================================================
// Lecture 3 — 03: TypeScript Best Practices
// Slides 17–43
// Run: npx ts-node src/lecture-3/03-best-practices.ts
// ============================================================

// ---- BEST PRACTICE 1: Strict Mode -------------------------
// "strict": true in tsconfig.json — already enabled!
// It catches these kinds of mistakes:

// ❌ Without strict — null is silently allowed
// let name: string = null;        // no error
// function add(x, y) { ... }      // x, y are implicitly any

// ✅ With strict (what we have)
let username: string = "Budi";    // must be a real string
function addStrict(x: number, y: number): number {
  return x + y;
}

// Strict also catches extra properties in object literals:
interface StrictPerson {
  name: string;
}
// let p: StrictPerson = { name: "Budi", age: 25 };
// ❌ Error: Object literal may only specify known properties

// ---- BEST PRACTICE 2: Type Every Variable and Function ----

// ❌ Implicit any
// function multiply(a, b) { return a * b; }

// ✅ Explicit types — clear contract, IDE autocomplete works
let count: number = 5;
function multiply(a: number, b: number): number {
  return a * b;
}

// ---- BEST PRACTICE 3: Use Interfaces for Data Structures --

// ❌ Inline type repeated everywhere — hard to change
// function printUser(user: { id: number; username: string }) {}
// function saveUser(user: { id: number; username: string }) {}

// ✅ One interface, used everywhere
interface User {
  id: number;
  username: string;
  email: string;
}

function printUser(user: User): void {
  console.log(`  User: ${user.username} (${user.email})`);
}

function formatUser(user: User): string {
  return `[${user.id}] ${user.username}`;
}

// ---- BEST PRACTICE 4: Avoid `any` — use `unknown` ---------

// ❌ any — TypeScript stops checking entirely
// function processInput(value: any): void {
//   value.doAnything();   // no error, but might crash at runtime
// }

// ✅ unknown — TypeScript forces you to check before using
function processInput(value: unknown): void {
  if (typeof value === "string") {
    console.log("  String:", value.toUpperCase()); // safe: we checked
  } else if (typeof value === "number") {
    console.log("  Number:", value.toFixed(2));    // safe: we checked
  } else {
    console.log("  Unknown type:", value);
  }
}

// ---- BEST PRACTICE 5: Union Types and Enums ---------------

// Union type for flexible inputs
type Result = string | number;

function processResult(result: Result): void {
  if (typeof result === "string") {
    console.log("  Result (string):", result.toUpperCase());
  } else {
    console.log("  Result (number):", result.toFixed(2));
  }
}

// Enum for a set of related named states
enum OrderStatus {
  Pending   = "PENDING",
  Approved  = "APPROVED",
  Rejected  = "REJECTED",
}

function updateStatus(status: OrderStatus): void {
  console.log(`  Order status updated to: ${status}`);
}

// ---- BEST PRACTICE 6: Use Modules -------------------------
// (Covered in 01-modules/ — split code into focused files)
//
// ✅ Each file has one responsibility:
//   cart.ts      → cart logic
//   payment.ts   → payment logic
//   user.ts      → user logic

// ---- BEST PRACTICE 7: async/await -------------------------
// (Covered in Lecture 2 — always use async/await over raw callbacks)

async function fetchData(url: string): Promise<string> {
  // ✅ readable, linear flow
  const response = await fetch(url).catch(() => null);
  if (!response) return "Error fetching data";
  return response.text();
}

// ---- BEST PRACTICE 8: Descriptive Names ------------------

// ❌ Meaningless names
// let x = 10;
// let y = 20;
// function calc(a: number, b: number): number { return a * b; }

// ✅ Self-documenting names
let totalPrice: number   = 10;
let discountAmount: number = 20;

function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// ---- BEST PRACTICE 9: Consistent Formatting ---------------

// ❌ Inconsistent spacing (hard to read)
// function   poorlyFormattedFunction  (value:number):number{
//     return value+1;
// }

// ✅ Consistent spacing (use Prettier to automate this)
function wellFormattedFunction(value: number): number {
  return value + 1;
}

// ---- BEST PRACTICE 10: Mistakes vs Better -----------------

// Mistake 1: untyped function
// function add(a, b) { return a + b; }
// Better:
function add(a: number, b: number): number {
  return a + b;
}

// Mistake 2: using `any`
// function dynamicFunction(value: any) { ... }
// Better: use `unknown` + narrow with typeof
function dynamicFunction(value: unknown): void {
  if (typeof value === "string") {
    console.log("  Handling string:", value);
  }
}

// Mistake 3: raw magic number
// if (orderCode === 3) { ... }
// Better:
enum OrderCode {
  Created   = 1,
  Paid      = 2,
  Shipped   = 3,
  Delivered = 4,
}
// if (orderCode === OrderCode.Shipped) { ... }  ← readable!

// ---- LET'S RUN IT -----------------------------------------

console.log("\n========== BEST PRACTICES ==========\n");

console.log("--- #1 Strict: addStrict ---");
console.log("  addStrict(3, 4):", addStrict(3, 4));

console.log("\n--- #2 Typed: multiply ---");
console.log("  multiply(6, 7):", multiply(6, 7));

console.log("\n--- #3 Interface: User ---");
const user: User = { id: 1, username: "budi99", email: "budi@mail.com" };
printUser(user);
console.log(" ", formatUser(user));

console.log("\n--- #4 unknown vs any ---");
processInput("hello world");
processInput(3.14159);
processInput(true);

console.log("\n--- #5 Union + Enum ---");
processResult("typescript");
processResult(42);
updateStatus(OrderStatus.Approved);

console.log("\n--- #8 Descriptive names ---");
console.log("  totalPrice:", totalPrice);
console.log("  discountAmount:", discountAmount);
console.log("  calculateTotal(25_000, 3):", calculateTotal(25_000, 3));

console.log("\n--- #9 Formatting ---");
console.log("  wellFormattedFunction(10):", wellFormattedFunction(10));

console.log("\n--- #10 Mistakes vs Better ---");
console.log("  add(10, 20):", add(10, 20));
dynamicFunction("TypeScript is great");

console.log("\n=====================================");
