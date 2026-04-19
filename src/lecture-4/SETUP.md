# Lecture 4 — Jest Setup Guide

Starting from Lecture 4, we add **unit testing** to the project with:
- `jest` — the test runner
- `ts-jest` — lets Jest understand TypeScript directly (no compile step needed)
- `@types/jest` — TypeScript type definitions for `describe`, `test`, `expect`, etc.
- `tsconfig.test.json` — a separate TypeScript config just for tests

---

## Project structure for tests

Tests live in a separate `tests/` folder, mirroring the `src/` structure:

```
src/
  lecture-4/
    calculator.ts          ← source code you write
    shopping-cart.ts
    ...

tests/
  lecture-4/
    calculator.test.ts     ← tests for calculator.ts
    shopping-cart.test.ts
    ...
```

> **Why separate `tests/` from `src/`?**
> Keeps source code clean. When you build (`npm run build`), only `src/` compiles
> to `dist/`. Test files are never shipped to production.

---

## Step 1 — Install Jest dependencies

```bash
npm install --save-dev jest ts-jest @types/jest
```

| Package | What it does |
|---------|-------------|
| `jest` | The test runner — finds `.test.ts` files and runs them |
| `ts-jest` | Preprocessor that lets Jest read TypeScript without a separate build step |
| `@types/jest` | Type definitions so TypeScript recognises `describe`, `test`, `expect`, etc. |

---

## Step 2 — Add scripts to package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

| Script | What it does |
|--------|-------------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Re-run tests on every file save (great during development) |
| `npm run test:coverage` | Run tests + show how much of your code is covered |

---

## Step 3 — Add Jest config to package.json

```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": ["**/tests/**/*.test.ts"],
    "verbose": true,
    "globals": {
      "ts-jest": {
        "tsconfig": "tsconfig.test.json",
        "isolatedModules": true
      }
    }
  }
}
```

**What each option does:**

| Option | Why |
|--------|-----|
| `preset: "ts-jest"` | Tells Jest to use ts-jest to process `.ts` files |
| `testEnvironment: "node"` | Run tests in a Node.js environment (not browser) |
| `testMatch` | Only pick up files inside `tests/` — not source files in `src/` |
| `verbose: true` | Show each individual test name in the output |
| `tsconfig: "tsconfig.test.json"` | Use the test-specific TypeScript config (covers both `src/` and `tests/`) |
| `isolatedModules: true` | Faster test compilation — each file is compiled independently |

---

## Step 4 — Create tsconfig.test.json

Tests live in `tests/` but import from `src/`. The main `tsconfig.json` only
covers `src/`. We need a separate config that covers both.

Create `tsconfig.test.json` at the project root:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "."
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

> **Why extend instead of duplicate?**
> `extends` copies all settings from `tsconfig.json` so you only override what
> changes. Here we:
> - Set `noEmit: true` — tests don't need to produce `.js` files
> - Set `rootDir: "."` — the root is now the project root, not just `src/`
> - Extend `include` to cover both `src/` and `tests/`

---

## Step 5 — Run your tests

```bash
npm test                  # run all tests
npm run test:watch        # watch mode — re-runs on save
npm run test:coverage     # show coverage report
```

### Example output

```
PASS tests/lecture-4/calculator.test.ts
  Calculator
    add
      ✓ should return the sum of two positive numbers (2 ms)
      ✓ should return the correct sum when adding negative numbers
    divide
      ✓ should return the correct quotient
      ✓ should throw an error when dividing by zero (3 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

## How a test file is structured

```typescript
import { Calculator } from "../../src/lecture-4/calculator";

describe("Calculator", () => {          // group related tests
  const calc = new Calculator();

  test("adds two numbers", () => {       // one test case
    expect(calc.add(2, 3)).toBe(5);      // assertion
  });

  test("throws on divide by zero", () => {
    expect(() => calc.divide(10, 0)).toThrow("Division by zero");
  });
});
```

| Part | What it does |
|------|-------------|
| `describe("name", fn)` | Groups related tests under a label |
| `test("name", fn)` | A single test case |
| `expect(value)` | What you're checking |
| `.toBe(expected)` | The assertion — what you expect the value to be |

---

## Common matchers

```typescript
expect(2 + 2).toBe(4)                      // exact equality (primitives)
expect({ a: 1 }).toEqual({ a: 1 })         // deep equality (objects)
expect(value).toBeTruthy()                  // truthy check
expect(value).toBeFalsy()                   // falsy check
expect(value).toBeNull()                    // null check
expect(arr).toContain("item")               // array contains item
expect(() => fn()).toThrow("message")       // function throws
await expect(promise).resolves.toBe(value) // async: resolves to value
await expect(promise).rejects.toThrow()    // async: rejects
```

---

## Quick reference — full setup from scratch

```bash
# 1. install dependencies
npm install --save-dev jest ts-jest @types/jest

# 2. add scripts + jest config to package.json (see Step 2 & 3)

# 3. create tsconfig.test.json (see Step 4)

# 4. create your first test file in tests/
mkdir -p tests/lecture-4
touch tests/lecture-4/calculator.test.ts

# 5. run tests
npm test
```
