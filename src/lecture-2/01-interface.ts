export {};
// ============================================================
// Lecture 2 — 01: Interface
// Slides 25–30
// ============================================================

// ---- THE PROBLEM: duplicate object shapes -----------------
// Without interface, you repeat the shape everywhere. If it
// changes, you have to update every single declaration.

const john = {
  name: "John",
  age: 28,
};

const clara = {
  name: "Clara",
  age: 30,
};

// Imagine 10 more of these... messy & error-prone.
// That's the problem interfaces solve.

// ---- 1. DEFINING AN INTERFACE -----------------------------
// An interface is a named contract — a blueprint for object shape.

interface Person {
  name: string;
  age: number;
}

// Now use it:
const personJohn: Person = { name: "John", age: 28 };
const personClara: Person = { name: "Clara", age: 30 };

console.log("Person John:", personJohn);
console.log("Person Clara:", personClara);

// ---- 2. OPTIONAL PROPERTIES -------------------------------
// Add `?` to mark a property as optional

interface User {
  id: number;
  username: string;
  email?: string;   // optional — may or may not be present
}

// Function that accepts a User object
function printUser(user: User): void {
  console.log(`User ID: ${user.id}, Username: ${user.username}`);
  if (user.email) {
    console.log(`  Email: ${user.email}`);
  }
}

const userWithEmail: User    = { id: 1, username: "budi99",  email: "budi@mail.com" };
const userWithoutEmail: User = { id: 2, username: "sitidevi" };

// const badUser: User = { id: 3 };
// ❌ Error: Property 'username' is missing in type '{ id: number; }'

// ---- 3. INTERFACE AS FUNCTION PARAMETER -------------------
// This is the main power — you describe exactly what a function expects.

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function printBookDetails(book: Book): void {
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published Year: ${book.publishedYear}`
  );
}

const myBook: Book = {
  title: "Example Book",
  author: "John Doe",
  publishedYear: 2022,
};

// ---- 4. INTERFACES CAN BE REUSED --------------------------
// One interface, many objects. Change the shape in ONE place.

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function displayProduct(product: Product): string {
  const status = product.inStock ? "✅ In stock" : "❌ Out of stock";
  return `[${product.id}] ${product.name} — Rp ${product.price.toLocaleString("id-ID")} (${status})`;
}

const products: Product[] = [
  { id: 1, name: "Laptop",       price: 12_000_000, inStock: true  },
  { id: 2, name: "Mouse",        price:    250_000, inStock: true  },
  { id: 3, name: "Monitor 27\"", price:  4_500_000, inStock: false },
];

// ---- 5. SLIDE EXERCISE: E-Wallet interface ----------------
// "Write an interface of e-wallet, then declare a variable
//  of e-wallet data with the data type of the interface.
//  Field: name, code, userId, balance
//  Wrap those into a function that accepts e-wallet interface,
//  console.log the e-wallet"

interface EWallet {
  name: string;
  code: string;
  userId: string;
  balance: number;
}

function printEWallet(wallet: EWallet): void {
  console.log(
    `[${wallet.code}] ${wallet.name} — User: ${wallet.userId} | Balance: Rp ${wallet.balance.toLocaleString("id-ID")}`
  );
}

const myGoPay: EWallet = {
  name: "GoPay",
  code: "GOPAY",
  userId: "USR-001",
  balance: 250_000,
};

const myOVO: EWallet = {
  name: "OVO",
  code: "OVO",
  userId: "USR-001",
  balance: 150_000,
};

// ---- LET'S RUN IT -----------------------------------------

console.log("\n========== INTERFACE ==========\n");

console.log("--- printUser ---");
printUser(userWithEmail);
printUser(userWithoutEmail);

console.log("\n--- printBookDetails ---");
printBookDetails(myBook);

console.log("\n--- Products ---");
products.forEach((p) => console.log(displayProduct(p)));

console.log("\n--- E-Wallet (Slide Exercise) ---");
printEWallet(myGoPay);
printEWallet(myOVO);

console.log("\n================================");
