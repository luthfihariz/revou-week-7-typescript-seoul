export {};
// ============================================================
// Lecture 2 — 00: Quick Review of Lecture 1
// Topics: type annotations, primitives, objects, arrays,
//         union types, functions
// ============================================================

// ---- 1. TYPE ANNOTATION vs INFERENCE ----------------------

// Annotation: you explicitly tell TypeScript the type
let username: string = "Budi";
let age: number = 25;
let isActive: boolean = true;

// Inference: TypeScript figures it out from the value
let city = "Jakarta";       // inferred: string
let score = 98.5;           // inferred: number
let isVerified = false;     // inferred: boolean

// city = 42;               // ❌ Error: Type 'number' is not assignable to type 'string'

// ---- 2. OBJECT TYPES --------------------------------------

// Inline object type annotation
let user: {
  name: string;
  age: number;
  isPremium: boolean;
} = {
  name: "Siti",
  age: 28,
  isPremium: true,
};

console.log("User:", user);

// ---- 3. ARRAYS --------------------------------------------

let fruits: string[] = ["apple", "mango", "durian"];
let prices: number[] = [5_000, 12_000, 30_000];

// fruits.push(99);         // ❌ Error: Argument of type 'number' not assignable to 'string'
fruits.push("rambutan");    // ✅ OK

// Mixed array with union type
let mixedList: (string | number)[] = ["item-A", 1, "item-B", 2];

// ---- 4. UNION TYPES (literal) -----------------------------

type Direction = "north" | "south" | "east" | "west";
type HttpStatus = 200 | 400 | 401 | 404 | 500;

let heading: Direction = "north";
let responseCode: HttpStatus = 200;

// heading = "up";          // ❌ Error: not assignable to type Direction

// ---- 5. FUNCTIONS -----------------------------------------

// Typed params + return type
function add(a: number, b: number): number {
  return a + b;
}

// Void — returns nothing
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Optional param
function createTag(text: string, tag?: string): string {
  return `<${tag ?? "p"}>${text}</${tag ?? "p"}>`;
}

// Default param
function discount(price: number, pct: number = 10): number {
  return price * (1 - pct / 100);
}

// Rest param
function sumAll(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

// ---- LET'S RUN IT -----------------------------------------

console.log("\n========== LECTURE 1 REVIEW ==========\n");

console.log("add(3, 4)         →", add(3, 4));
greet("Jakarta");
console.log("createTag('Hi')   →", createTag("Hi"));
console.log("createTag('Hi', 'h1') →", createTag("Hi", "h1"));
console.log("discount(100_000) →", discount(100_000));      // default 10%
console.log("discount(100_000, 25) →", discount(100_000, 25));
console.log("sumAll(1,2,3,4,5) →", sumAll(1, 2, 3, 4, 5));
console.log("heading:", heading, "| responseCode:", responseCode);

console.log("\n======================================");
