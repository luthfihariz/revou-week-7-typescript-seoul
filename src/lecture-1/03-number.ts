export {};

// ============================================================
// Lecture 1 — Slide 29
// Number Type
// ============================================================
// TypeScript uses `number` for ALL numeric values:
// integers, floats, negative numbers, decimal, binary, hex, octal.
// For very large integers, use `bigint`.
// ============================================================

// --- Decimal (normal numbers) ---
let counter: number = 0;
let price: number = 9.99;
let temperature: number = -5;

console.log(counter, price, temperature);

// --- Binary (base 2) — prefix: 0B or 0b ---
let binary: number = 0b010; // = 2 in decimal
console.log("Binary 0b010 =", binary); // 2

// --- Hexadecimal (base 16) — prefix: 0X or 0x ---
let hexadecimal: number = 0xA00A; // = 40970 in decimal
// Note: used in colors (#FF5733), memory addresses, etc.
let colorRed: number = 0xFF0000;
console.log("Hex 0xA00A =", hexadecimal);
console.log("Red color hex =", colorRed);

// --- Octal (base 8) — prefix: 0o ---
let octal: number = 0o10; // = 8 in decimal
console.log("Octal 0o10 =", octal); // 8

// --- BigInt — for numbers too large for `number` ---
// Use `bigint` type, value ends with `n`
let big: bigint = 9007199254740991n;
console.log("BigInt:", big);

// You cannot mix number and bigint:
// let result = big + 1; // Error: Cannot mix BigInt and other types

// --- Readable numbers with underscores ---
// Underscores are allowed as separators for readability
let million: number = 1_000_000;
let bankBalance: number = 50_000_000;
console.log("Million:", million);
console.log("Bank balance:", bankBalance);
