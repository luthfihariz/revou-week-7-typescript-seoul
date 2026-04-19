// ============================================================
// Lecture 3 — 01-modules: cart.ts
// Slide exercise: "1st file cart.ts — make a function that
// can print the latest cart items, where the function
// accepts an array of string."
// ============================================================

// ---- NAMED EXPORT: individual function --------------------
// Other files can import just what they need:
// import { printCart } from './cart'

export function printCart(items: string[]): void {
  if (items.length === 0) {
    console.log("  🛒 Your cart is empty.");
    return;
  }
  console.log("  🛒 Cart items:");
  items.forEach((item, index) => {
    console.log(`    ${index + 1}. ${item}`);
  });
}

export function addToCart(items: string[], newItem: string): string[] {
  return [...items, newItem];
}

export function clearCart(): string[] {
  return [];
}

// ---- MODULE OBJECT EXPORT ---------------------------------
// Slide exercise: "Now convert the export function to become
// a module object instead."
//
// Instead of exporting individual functions, we group them
// into one object. Import looks like:
// import { cartModule } from './cart'
// cartModule.printCart(items)

export const cartModule = {
  printCart,
  addToCart,
  clearCart,
};

// ---- DEFAULT EXPORT (bonus) -------------------------------
// A file can also have one default export — useful when the
// file IS the thing (e.g. a class or the main utility object).
// import cart from './cart'  ← no curly braces needed

export default cartModule;
