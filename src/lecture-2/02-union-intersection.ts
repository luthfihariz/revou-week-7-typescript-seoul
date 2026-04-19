export {};
// ============================================================
// Lecture 2 — 02: Union & Intersection Types
// Slides 31–34
// ============================================================

// ---- 1. UNION TYPE (|) — quick refresh --------------------
// A variable can hold ONE of several types at a time.

// Union of primitives (NEW this lecture)
let identifier: number | string;
identifier = 123;       // ✅ number is fine
identifier = "ABC";     // ✅ string is also fine
// identifier = true;   // ❌ Error: boolean not in the union

// Union of literal strings (you already know this from Lecture 1)
type PaymentStatus = "pending" | "success" | "failed";
type UserRole = "admin" | "editor" | "viewer";

let txStatus: PaymentStatus = "pending";
let role: UserRole = "editor";

// txStatus = "cancelled";  // ❌ Error: not a valid PaymentStatus

// Union in function parameter — handle multiple input types
function formatId(id: number | string): string {
  // TypeScript narrows the type inside each branch
  if (typeof id === "number") {
    return `ID-${id.toString().padStart(5, "0")}`;  // e.g. "ID-00042"
  }
  return `ID-${id.toUpperCase()}`;                  // e.g. "ID-ABC"
}

// ---- 2. INTERSECTION TYPE (&) -----------------------------
// Combine multiple types into ONE — the new object must have ALL properties.
// Think of it as "type A AND type B", not "type A OR type B".

interface PersonInfo {
  name: string;
  age: number;
}

interface EmployeeInfo {
  employeeId: number;
  role: string;
}

// EmployeePerson must satisfy BOTH PersonInfo AND EmployeeInfo
type EmployeePerson = PersonInfo & EmployeeInfo;

const employeePerson: EmployeePerson = {
  name: "John",
  age: 25,
  employeeId: 123,
  role: "Developer",
};

// Missing any property causes an error:
// const bad: EmployeePerson = { name: "Jane", age: 30 };
// ❌ Error: Property 'employeeId' is missing

// ---- 3. INTERSECTION BUILDS ON INTERFACES -----------------
// Very common pattern: build rich types from small, focused interfaces.

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface Auditable {
  createdBy: string;
}

// A full database record combines both
type DbRecord = PersonInfo & Timestamps & Auditable;

const record: DbRecord = {
  name: "Dewi",
  age: 31,
  createdAt: "2024-01-15",
  updatedAt: "2024-03-20",
  createdBy: "admin",
};

// ---- 4. SLIDE EXERCISE ------------------------------------
// "Make an intersection (type) called AcceptedPayment that
//  accepts E-wallet OR Bank."
//
// NOTE: The slide says "accept E-wallet or Bank" but the clue
// shows intersection (&) — so AcceptedPayment has ALL fields
// from both EWallet AND Bank (useful for a dual-wallet account).

interface EWallet {
  name: string;
  code: string;
  userId: string;
  balance: number;
}

interface Bank {
  accountName: string;
  accountNumber: string;
  balance: number;
}

// Intersection: must have every field from BOTH interfaces
type AcceptedPayment = EWallet & Bank;

const myPaymentAccount: AcceptedPayment = {
  // EWallet fields
  name: "GoPay",
  code: "GOPAY",
  userId: "USR-001",
  // Bank fields
  accountName: "Budi Santoso",
  accountNumber: "1234567890",
  // shared
  balance: 500_000,
};

// "Make a function to deduct the money balance with a defined
//  transaction amount with the acceptable payment method.
//  transact(balance, amount, paymentMethod)"

function transact(balance: number, amount: number, paymentMethod: AcceptedPayment): void {
  if (amount > balance) {
    console.log(`❌ Insufficient balance. Have: Rp ${balance.toLocaleString("id-ID")}, Need: Rp ${amount.toLocaleString("id-ID")}`);
    return;
  }
  const remaining = balance - amount;
  console.log(`✅ Paid Rp ${amount.toLocaleString("id-ID")} via ${paymentMethod.name} (${paymentMethod.code})`);
  console.log(`   Remaining balance: Rp ${remaining.toLocaleString("id-ID")}`);
}

// ---- UNION vs INTERSECTION SUMMARY ------------------------
// | Feature     | Union (|)                 | Intersection (&)              |
// |-------------|---------------------------|-------------------------------|
// | Meaning     | Type A OR Type B          | Type A AND Type B             |
// | Object must | satisfy at least one      | satisfy ALL types             |
// | Use case    | flexible input types      | merge/combine shapes          |

// ---- LET'S RUN IT -----------------------------------------

console.log("\n========== UNION & INTERSECTION ==========\n");

console.log("--- formatId ---");
console.log(formatId(42));
console.log(formatId("abc"));

console.log("\n--- EmployeePerson ---");
console.log(employeePerson);

console.log("\n--- DbRecord ---");
console.log(record);

console.log("\n--- transact (Slide Exercise) ---");
transact(myPaymentAccount.balance, 150_000, myPaymentAccount);   // success
transact(myPaymentAccount.balance, 600_000, myPaymentAccount);   // insufficient

console.log("\n===========================================");
