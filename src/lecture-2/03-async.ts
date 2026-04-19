export {};
// ============================================================
// Lecture 2 — 03: Async Programming with TypeScript
// Slides 20–22
// ============================================================

// ---- WHAT IS ASYNC? ---------------------------------------
// Synchronous code runs line-by-line — each line waits for
// the previous one to finish.
//
// Asynchronous code lets you START something slow (API call,
// file read, DB query) and continue doing other work while
// waiting. When the slow thing finishes, you come back to it.
//
// Analogy: ordering food at a warung.
// Sync  → you stand at the counter watching them cook. Nobody
//          else gets served until your food is ready.
// Async → you sit down, they call you when it's done. Other
//          customers get served in parallel.

// ---- 1. Promise<T> ----------------------------------------
// A Promise represents a value that will be available in the
// future. TypeScript types it with a generic: Promise<T>
// where T is the type of the resolved value.

// A simple function that resolves after a delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---- 2. async / await -------------------------------------
// `async` marks a function as asynchronous — it always returns
// a Promise. `await` pauses execution inside the function
// until the Promise resolves.

// From slide 20: basic async function
async function fetchData(): Promise<string> {
  await delay(500);                          // simulate network wait
  return "Hello from the server!";
}

// From slide 22: Promise with a typed payload
interface User {
  name: string;
  age: number;
}

// Helper that pretends to call an API
function simulateFetchFromAPI<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

// fetchUserData: exactly what the slide shows
async function fetchUserData(): Promise<User> {
  const data = await simulateFetchFromAPI<User>({ name: "John", age: 30 });
  return data;
}

// ---- 3. REALISTIC EXAMPLE ---------------------------------
// Fetching a product from a fake API — typed end-to-end

interface Product {
  id: number;
  name: string;
  price: number;
}

async function getProduct(id: number): Promise<Product> {
  console.log(`  Fetching product #${id}...`);
  await delay(800);

  // Simulate DB lookup
  const products: Product[] = [
    { id: 1, name: "Laptop",  price: 12_000_000 },
    { id: 2, name: "Mouse",   price:    250_000 },
    { id: 3, name: "Monitor", price:  4_500_000 },
  ];

  const found = products.find((p) => p.id === id);
  if (!found) throw new Error(`Product #${id} not found`);
  return found;
}

// ---- 4. ERROR HANDLING ------------------------------------
// Always wrap await calls in try/catch — the Promise might reject.

async function getProductSafely(id: number): Promise<void> {
  try {
    const product = await getProduct(id);
    console.log(`  ✅ Got: ${product.name} — Rp ${product.price.toLocaleString("id-ID")}`);
  } catch (error) {
    console.log(`  ❌ Error: ${(error as Error).message}`);
  }
}

// ---- 5. MULTIPLE AWAITS -----------------------------------
// You can await sequentially (one after another) or in
// parallel with Promise.all

async function getUserAndProduct(): Promise<void> {
  console.log("  Fetching user and product...");

  // Sequential: user first, then product (slower — waits for each)
  const user    = await fetchUserData();
  const product = await getProduct(1);

  console.log(`  User: ${user.name} bought ${product.name}`);
}

async function getProductsInParallel(): Promise<void> {
  console.log("  Fetching two products in parallel...");

  // Parallel: both start at the same time (faster)
  const [p1, p2] = await Promise.all([getProduct(1), getProduct(2)]);

  console.log(`  Products: ${p1.name} & ${p2.name}`);
}

// ---- LET'S RUN IT -----------------------------------------
// async main() pattern — top-level await isn't available
// without a module-aware tsconfig, so we wrap everything.

async function main(): Promise<void> {
  console.log("\n========== ASYNC PROGRAMMING ==========\n");

  console.log("--- fetchData (slide 20) ---");
  const message = await fetchData();
  console.log(" ", message);

  console.log("\n--- fetchUserData (slide 22) ---");
  const user = await fetchUserData();
  console.log("  User:", user);

  console.log("\n--- getProduct (existing ID) ---");
  await getProductSafely(2);

  console.log("\n--- getProduct (missing ID) ---");
  await getProductSafely(99);

  console.log("\n--- sequential await ---");
  await getUserAndProduct();

  console.log("\n--- Promise.all (parallel) ---");
  await getProductsInParallel();

  console.log("\n========================================");
}

main();
