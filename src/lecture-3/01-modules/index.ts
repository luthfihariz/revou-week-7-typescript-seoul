// ============================================================
// Lecture 3 — 01-modules: index.ts
// Slide exercise: "2nd file index.ts — import that function,
// and call it."
// Run: npm run build && node dist/lecture-3/01-modules/index.js
// ============================================================

// ---- NAMED IMPORTS ----------------------------------------
// Pick only what you need from the module
import { printCart, addToCart, clearCart } from "./cart";

// ---- MODULE OBJECT IMPORT ---------------------------------
// Import the whole grouped object
import { cartModule } from "./cart";

// ---- DEFAULT IMPORT (no curly braces) ---------------------
import cart from "./cart";

// ---- LET'S USE THEM ---------------------------------------

console.log("\n========== MODULE RESOLUTION ==========\n");

// Using named imports directly
let myCart: string[] = [];
myCart = addToCart(myCart, "Nasi Goreng Spesial");
myCart = addToCart(myCart, "Es Teh Manis");
myCart = addToCart(myCart, "Kerupuk");

console.log("--- Named import: printCart ---");
printCart(myCart);

console.log("\n--- Module object: cartModule.printCart ---");
cartModule.printCart(myCart);

console.log("\n--- Default import: cart.printCart ---");
cart.printCart(myCart);

// Clear the cart
console.log("\n--- After clearCart ---");
myCart = clearCart();
printCart(myCart);

// ---- WHY MODULES? -----------------------------------------
// Without modules, every function lives in one giant file.
// With modules:
//   ✓ cart.ts   → handles cart logic
//   ✓ payment.ts → handles payment logic
//   ✓ user.ts   → handles user logic
//   ✓ index.ts  → ties it all together
//
// Each file has ONE responsibility. Easy to find, easy to test.

console.log("\n========================================");
