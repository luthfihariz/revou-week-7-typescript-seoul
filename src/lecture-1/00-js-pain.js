// ============================================================
// Lecture 1 — The Real Pain in JavaScript
// This file is plain JavaScript — no TypeScript, no types.
// Run: node src/lecture-1/00-js-pain.js
// ============================================================

// ============================================================
// THE SETUP — looks completely normal
// ============================================================

// A simple function. Looks fine, right?
function getUser(user) {
  return user.name.toUpperCase();
}

// Another function — formats an order for display
function formatOrder(order) {
  return `Order #${order.id}: ${order.items.join(", ")} — Rp ${order.total}`;
}

// ============================================================
// IN A TUTORIAL — everything works perfectly
// ============================================================

console.log("========== HAPPY PATH (tutorial world) ==========\n");

const user = { name: "Budi", age: 25 };
console.log("getUser:", getUser(user));

const order = { id: 101, items: ["Nasi Goreng", "Es Teh"], total: 45000 };
console.log("formatOrder:", formatOrder(order));

// ============================================================
// IN REAL PROJECTS — data comes from APIs, users, teammates
// ============================================================

console.log("\n========== REAL WORLD (things go wrong) ==========\n");

// --- Crash 1: API returns null when user is not found ---
console.log("--- Crash 1: user from API is null ---");
try {
  const userFromApi = null; // API: "user not found"
  console.log(getUser(userFromApi));
} catch (e) {
  console.log("💥", e.message);
  console.log("   JavaScript had no way to warn you before this ran.\n");
}

// --- Crash 2: API changed the field name ---
console.log("--- Crash 2: backend renamed 'name' to 'fullName' ---");
try {
  const userFromApi = { fullName: "Budi", age: 25 }; // API changed shape
  console.log(getUser(userFromApi)); // undefined.toUpperCase()
} catch (e) {
  console.log("💥", e.message);
  console.log("   No warning. No red line. Just a crash in production.\n");
}

// --- Crash 3: teammate passed the wrong thing ---
console.log("--- Crash 3: teammate called getUser with just a name string ---");
try {
  console.log(getUser("Budi")); // they meant well
} catch (e) {
  console.log("💥", e.message);
  console.log("   JavaScript accepted it. No complaints. Crashed at runtime.\n");
}

// --- Crash 4: order items is not an array ---
console.log("--- Crash 4: order.items came as a string, not an array ---");
try {
  const orderFromApi = { id: 202, items: "Nasi Goreng", total: 25000 };
  console.log(formatOrder(orderFromApi)); // "Nasi Goreng".join is not a function
} catch (e) {
  console.log("💥", e.message);
  console.log("   JSON from the API had a different shape than expected.\n");
}

// --- Silent bug: wrong type, no crash, wrong answer ---
console.log("--- Silent bug: shipping cost from form input is a string ---");

function addShipping(subtotal, shipping) {
  return subtotal + shipping;
}

const subtotal = 100000;
const shippingFromForm = "15000"; // HTML inputs are always strings
const total = addShipping(subtotal, shippingFromForm);

console.log("Expected:", 115000);
console.log("Got:     ", total);
console.log(
  total === 115000
    ? "✅ Correct"
    : "🐛 Silent bug — JavaScript did string concatenation, not addition!"
);
console.log("   No crash. No error. Customer was charged Rp", total, "instead of Rp 115000.\n");

// ============================================================
// THE PATTERN
// ============================================================

console.log("========== THE PATTERN ==========\n");
console.log("These are not beginner mistakes.");
console.log("They happen because:\n");
console.log("  • APIs change shape without telling you");
console.log("  • User input is always a string");
console.log("  • Teammates call functions differently than you expected");
console.log("  • Data can always be null or undefined\n");
console.log("In JavaScript, you discover these bugs at runtime.");
console.log("In TypeScript, you see a red line in your editor — before you run anything.");
console.log("\nThat's what the rest of this course is about.\n");
