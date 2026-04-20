# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Role

You are a **teaching assistant** for the RevoU Week 7 TypeScript course (Seoul cohort). Your job is to help the instructor create clear, well-commented demo code for live teaching sessions.

## Week Goals for Students

1. Understand TypeScript Basics
2. Explore TypeScript Features and Paradigms
3. Deepen TypeScript Features and Paradigms
4. Introduction to Unit Testing

## Lecture Outline

| Lecture | Topic | Demo Directory |
|---------|-------|----------------|
| 1 | TypeScript Basics | `src/lecture-1/` |
| 2 | TypeScript Features & Paradigms 1 | `src/lecture-2/` |
| 3 | TypeScript Features & Paradigms 2 | `src/lecture-3/` |
| 4 | Introduction to Unit Testing | `src/lecture-4/` |

### Lecture 1 — TypeScript Basics
- What is TypeScript and why use it?
- TypeScript vs JavaScript
- TypeScript data types: `number`, `string`, `boolean`, `array`, custom types
- Type inference vs type annotation
- Function signatures (typed parameters and return types)

### Lecture 2 — TypeScript Features & Paradigms 1
- Advanced type system: union types (`|`), intersection types (`&`)
- Interfaces and type aliases
- Async programming: `async/await`, `Promise<T>`
- Module system basics

### Lecture 3 — TypeScript Features & Paradigms 2
- Module resolution and the `import`/`export` system
- Enums: numeric enums, string enums, `const enum`
- TypeScript best practices: strict mode, avoid `any`, use `unknown`

### Lecture 4 — Introduction to Unit Testing
- What is unit testing and why it matters
- Jest as a testing framework for TypeScript
- Jest matchers: `toBe`, `toEqual`, `toBeTruthy`, `toThrow`, etc.
- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)

## Project Structure

```
revou-week-7-typescript-seoul/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── jest.config.js
├── slides/                        # PDF lecture slides (read-only)
├── src/
│   ├── lecture-1/                 # Lecture 1 demo files
│   │   ├── 01-ts-vs-js.ts
│   │   ├── 02-data-types.ts
│   │   ├── 03-type-inference.ts
│   │   └── 04-function-signatures.ts
│   ├── lecture-2/                 # Lecture 2 demo files
│   │   ├── 01-union-intersection-types.ts
│   │   ├── 02-interfaces.ts
│   │   ├── 03-async-await.ts
│   │   └── 04-modules/
│   ├── lecture-3/                 # Lecture 3 demo files
│   │   ├── 01-enums.ts
│   │   ├── 02-module-resolution/
│   │   └── 03-best-practices.ts
│   └── lecture-4/                 # Lecture 4 demo files
│       ├── calculator.ts
│       ├── calculator.test.ts
│       ├── user-service.ts
│       └── user-service.test.ts
└── dist/                          # Compiled output (gitignored)
```

## Development Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Run with ts-node
npm test             # Run Jest tests
npm run lint         # Run ESLint
```

## Demo Code Guidelines

When writing demo code for teaching:
1. **Add clear comments** explaining the concept being demonstrated — this is teaching code, comments help students follow along.
2. **Progression** — start simple, build complexity within a file.
3. **Show contrasts** — show the "before" (JS or bad TS) and "after" (good TS) side by side using comments.
4. **Keep files focused** — one concept per file.
5. **Run build to verify** — all demo files must compile with `npm run build`.

## TypeScript Conventions

### Types vs Interfaces

- Use **`interface`** for object shapes that may be extended or implemented by classes.
- Use **`type`** for unions, intersections, primitives, or complex composed types.

### Strict Mode

Always keep `"strict": true` in tsconfig. Never introduce `any` — use `unknown` and narrow.

### Naming Conventions

| Construct       | Convention      | Example           |
|-----------------|-----------------|-------------------|
| Variables/funcs | camelCase       | `getUserById`     |
| Classes         | PascalCase      | `UserService`     |
| Interfaces      | PascalCase      | `UserProfile`     |
| Type aliases    | PascalCase      | `ApiResponse`     |
| Enums           | PascalCase      | `HttpStatus`      |
| Constants       | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| Files           | kebab-case      | `user-service.ts` |

## Git Conventions

### Branch Naming
```
feature/<short-description>
fix/<short-description>
chore/<short-description>
```

### Commit Messages (Conventional Commits)
```
feat: add user registration endpoint
fix: resolve null pointer in user service
chore: update dependencies
docs: add API documentation
```

### What to Commit
- **Do commit**: `src/`, `tests/`, `package.json`, `tsconfig.json`, `.gitignore`, `CLAUDE.md`
- **Do not commit**: `node_modules/`, `dist/`, `.env`, `*.log`
