export {};
// ============================================================
// Lecture 3 — 00: Quick Review of Lecture 2
// Topics: interface, union, intersection, async/await
// Run: npx ts-node src/lecture-3/00-review.ts
// ============================================================

// ---- 1. INTERFACE -----------------------------------------

interface User {
  id: number;
  username: string;
  email?: string;   // optional
}

function printUser(user: User): void {
  console.log(`[${user.id}] ${user.username} ${user.email ? `<${user.email}>` : "(no email)"}`);
}

// ---- 2. UNION TYPE ----------------------------------------

type PaymentMethod = "cash" | "card" | "transfer";

function describePayment(method: PaymentMethod): string {
  const descriptions: Record<PaymentMethod, string> = {
    cash:     "Bayar tunai",
    card:     "Kartu kredit/debit",
    transfer: "Transfer bank",
  };
  return descriptions[method];
}

// ---- 3. INTERSECTION TYPE ---------------------------------

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  quantity: number;
  addedAt: string;
}

type CartProduct = Product & CartItem;

function printCartProduct(item: CartProduct): void {
  const subtotal = item.price * item.quantity;
  console.log(`  ${item.name} x${item.quantity} = Rp ${subtotal.toLocaleString("id-ID")}`);
}

// ---- 4. ASYNC / AWAIT -------------------------------------

interface Order {
  orderId: string;
  total: number;
  status: string;
}

function simulateApi<T>(data: T, delayMs: number = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

async function fetchOrder(orderId: string): Promise<Order> {
  console.log(`  Fetching order ${orderId}...`);
  return simulateApi({ orderId, total: 125_000, status: "confirmed" });
}

// ---- LET'S RUN IT -----------------------------------------

async function main(): Promise<void> {
  console.log("\n========== LECTURE 2 REVIEW ==========\n");

  console.log("--- Interface ---");
  printUser({ id: 1, username: "budi99", email: "budi@mail.com" });
  printUser({ id: 2, username: "sitidevi" });

  console.log("\n--- Union Type ---");
  console.log(describePayment("cash"));
  console.log(describePayment("transfer"));

  console.log("\n--- Intersection Type ---");
  const cartItems: CartProduct[] = [
    { id: 1, name: "Laptop",  price: 12_000_000, quantity: 1, addedAt: "2024-01-10" },
    { id: 2, name: "Mouse",   price:    250_000, quantity: 2, addedAt: "2024-01-10" },
  ];
  cartItems.forEach(printCartProduct);

  console.log("\n--- Async/Await ---");
  const order = await fetchOrder("ORD-001");
  console.log(`  Order: ${order.orderId} | Total: Rp ${order.total.toLocaleString("id-ID")} | ${order.status}`);

  console.log("\n======================================");
}

main();
