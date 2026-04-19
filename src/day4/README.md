# Day 4 — Unit Testing with Jest

## Prerequisites

This assumes the project already has `package.json` and `tsconfig.json` set up.

---

## 1. Install Dependencies

Run the following command to add Jest and its TypeScript support as dev dependencies:

```bash
npm install jest ts-jest @types/jest --save-dev
```

| Package      | Purpose                                          |
|--------------|--------------------------------------------------|
| `jest`       | Test runner                                      |
| `ts-jest`    | Compiles TypeScript files for Jest               |
| `@types/jest`| TypeScript type definitions for Jest globals (`describe`, `test`, `expect`, etc.) |

---

## 2. Update `package.json`

Add the following `scripts` and `jest` configuration:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": ["**/tests/**/*.test.ts"],
    "collectCoverageFrom": ["src/**/*.ts"],
    "verbose": true
  }
}
```

---

## 3. Update `tsconfig.json`

Make sure the `include` array covers both source and test files, and `rootDir` is set to the project root:

```json
{
  "compilerOptions": {
    "rootDir": "."
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

> If `rootDir` is set to `./src`, TypeScript will complain when it finds test files outside that folder.

---

## 4. Folder Structure

```
project-root/
├── package.json
├── tsconfig.json
├── src/
│   └── day4/         ← source files
│       ├── calculator.ts
│       ├── grade-calculator.ts
│       ├── math-utils.ts
│       ├── notification-service.ts
│       ├── product-api.ts
│       ├── registration-service.ts
│       ├── shopping-cart.ts
│       ├── string-utils.ts
│       └── user-service.ts
└── tests/            ← test files (mirrors src/day4/)
    ├── calculator.test.ts
    ├── grade-calculator.test.ts
    ├── math-utils.test.ts
    ├── product-api.test.ts
    ├── registration-service.test.ts
    ├── shopping-cart.test.ts
    ├── string-utils.test.ts
    └── user-service.test.ts
```

---

## 5. Running Tests

```bash
# Run all tests
npm test

# Run a specific test file
npx jest tests/calculator.test.ts

# Run tests in watch mode (re-runs on file save)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

---

## 6. What Each Example Covers

| File | Concept |
|------|---------|
| `calculator.ts` | TDD — write test first, then implement |
| `user-service.ts` | BDD — Given / When / Then scenarios |
| `math-utils.ts` | Logic checks, boundary checks, error handling |
| `string-utils.ts` | Boundary checks (empty, exact-length, edge cases) |
| `grade-calculator.ts` | Exhaustive boundary checks at every grade cutoff |
| `shopping-cart.ts` | Object-oriented checks — verify state changes |
| `registration-service.ts` | Mock functions — `jest.fn()`, `toHaveBeenCalledWith` |
| `product-api.ts` | Async testing — `async/await` with Jest |
