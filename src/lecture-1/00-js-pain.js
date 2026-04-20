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
const nullUser = null; // API: "user not found"
console.log(getUser(nullUser));

// --- Crash 2: API changed the field name ---
const fullNameUser = { fullName: "Budi", age: 25 }; // API changed shape
console.log(getUser(userFromDatabase)); // undefined.toUpperCase()