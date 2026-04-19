export {};
// ============================================================
// Lecture 3 — 02: Enums
// Slides 10–16
// Run: npx ts-node src/lecture-3/02-enums.ts
// ============================================================

// ---- THE PROBLEM: magic numbers/strings -------------------
// Without enums, you'd use raw numbers or strings everywhere.
// Nobody knows what 1 means, and typos are invisible to TS.

// ❌ Bad — what does 2 mean here?
// let orderStatus = 2;
// if (orderStatus === 2) { /* processing? completed? cancelled? */ }

// ❌ Bad — "complted" typo won't be caught at compile time
// let status = "complted";

// ✅ Enums give names to related constants

// ---- 1. NUMERIC ENUM (slide 13) ---------------------------
// Values auto-increment from the first assigned number.
// Direction.up = 1, .down = 2, .left = 3, .right = 4

enum Direction {
  up    = 1,
  down,   // 2
  left,   // 3
  right,  // 4
}

let move: Direction = Direction.up;
console.log("move:", move);  // Output: 1

// TypeScript also lets you reverse-lookup by number:
console.log("Direction[1]:", Direction[1]); // Output: "up"

// ---- 2. ENUM IN SWITCH STATEMENT (slide 14) ---------------

enum TaskStatus {
  Pending,      // 0
  InProgress,   // 1
  Completed,    // 2
}

function getStatusMessage(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Pending:    return "⏳ The task is pending.";
    case TaskStatus.InProgress: return "🔄 The task is in progress.";
    case TaskStatus.Completed:  return "✅ The task is completed.";
    default:                    return "❓ Unknown status.";
  }
}

console.log(getStatusMessage(TaskStatus.InProgress));
// Output: The task is in progress.

// ---- 3. STRING ENUM (slide 15) ----------------------------
// Values are explicit strings — more readable in logs/APIs.

enum LogLevel {
  Error = "ERROR",
  Warn  = "WARN",
  Info  = "INFO",
  Debug = "DEBUG",
}

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString().split("T")[0];
  console.log(`[${timestamp}] [${level}] ${message}`);
}

log(LogLevel.Info,  "Server started on port 3000");
log(LogLevel.Warn,  "Memory usage above 80%");
log(LogLevel.Error, "Database connection failed");

// ---- 4. ENUM vs UNION TYPE — when to use which? ----------
// Union type:  type Direction = "north" | "south"  → simple, no runtime value
// Enum:        enum Direction { North = "NORTH" }  → has runtime value, reversible, groupable

// Use ENUM when:
//   - values have meaning beyond their name (numbers, specific strings)
//   - you need to iterate or reverse-lookup
//   - it's a core domain concept (OrderStatus, LogLevel, UserRole)
//
// Use UNION TYPE when:
//   - it's a simple set of string literals
//   - you don't need runtime access to the values

// ---- 5. SLIDE EXERCISE: Transaction state machine ---------
// "Make a function to set the transaction state to completed,
//  use enum for transaction state.
//  Define a variable of a pending transaction.
//  Make a function to set the variable transaction,
//  change the state to be completed.
//  Parameter 1: transaction object, Parameter 2: desired state"

enum TransactionState {
  Pending   = "PENDING",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Failed    = "FAILED",
}

interface Transaction {
  id: string;
  amount: number;
  state: TransactionState;
}

// A pending transaction
let myTransaction: Transaction = {
  id: "TXN-001",
  amount: 250_000,
  state: TransactionState.Pending,
};

// Function to update transaction state
function setTransactionState(
  transaction: Transaction,
  newState: TransactionState
): Transaction {
  const updated = { ...transaction, state: newState };
  console.log(`  [${updated.id}] ${transaction.state} → ${updated.state}`);
  return updated;
}

// ---- LET'S RUN IT -----------------------------------------

console.log("\n========== ENUMS ==========\n");

console.log("--- Direction (numeric) ---");
console.log("Direction.up  :", Direction.up);
console.log("Direction.down:", Direction.down);

console.log("\n--- TaskStatus with switch ---");
console.log(getStatusMessage(TaskStatus.Pending));
console.log(getStatusMessage(TaskStatus.Completed));

console.log("\n--- LogLevel (string enum) ---");
log(LogLevel.Info, "Application boot complete");
log(LogLevel.Error, "Unhandled exception");

console.log("\n--- Transaction exercise ---");
console.log("Initial:", myTransaction.state);
myTransaction = setTransactionState(myTransaction, TransactionState.Processing);
myTransaction = setTransactionState(myTransaction, TransactionState.Completed);
console.log("Final:", myTransaction.state);

console.log("\n============================");
