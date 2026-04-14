# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Project Overview

This is a **RevoU Week 7 TypeScript** project (Seoul cohort). The repository covers core TypeScript concepts including the type system, object-oriented programming, and building typed Node.js/Express applications.

## Repository Status

This repository is newly initialized. As code is added, update this file to reflect the actual structure, scripts, and conventions in use.

## Expected Project Structure

```
revou-week-7-typescript-seoul/
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── index.ts          # Application entry point
│   ├── types/            # Shared TypeScript interfaces and type aliases
│   ├── models/           # Class definitions and data models
│   ├── controllers/      # Request handlers (if using Express)
│   ├── routes/           # Route definitions (if using Express)
│   ├── services/         # Business logic layer
│   └── utils/            # Utility/helper functions
├── dist/                 # Compiled JavaScript output (gitignored)
└── tests/                # Test files (*.test.ts or *.spec.ts)
```

## Development Workflow

### Setup

```bash
npm install          # Install dependencies
```

### Common Scripts (add to package.json as needed)

```bash
npm run build        # Compile TypeScript → JavaScript (tsc)
npm run dev          # Run with ts-node or nodemon for hot reload
npm start            # Run compiled output from dist/
npm test             # Run tests
npm run lint         # Run ESLint
```

### Typical tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## TypeScript Conventions

### Types vs Interfaces

- Use **`interface`** for object shapes that may be extended or implemented by classes.
- Use **`type`** for unions, intersections, primitives, or complex composed types.

```typescript
// Prefer interface for data shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// Use type for unions or aliases
type Status = "active" | "inactive" | "pending";
type UserOrNull = User | null;
```

### Enums

Use `enum` for a fixed set of named constants. Prefer `const enum` for performance when values are not iterated at runtime.

```typescript
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}
```

### Strict Mode

Always keep `"strict": true` in tsconfig. This enables:
- `strictNullChecks` — no implicit `null`/`undefined`
- `noImplicitAny` — no implicit `any` types
- `strictFunctionTypes` — stricter function type checking

### Avoid `any`

Never use `any` unless absolutely necessary. Prefer `unknown` for values of uncertain type, then narrow with type guards.

```typescript
// Bad
function parse(data: any) { ... }

// Good
function parse(data: unknown): SomeType {
  if (typeof data === "object" && data !== null) { ... }
}
```

### Null Handling

Use optional chaining (`?.`) and nullish coalescing (`??`) rather than explicit null checks where possible.

```typescript
const name = user?.profile?.name ?? "Anonymous";
```

### Naming Conventions

| Construct       | Convention         | Example                  |
|-----------------|--------------------|--------------------------|
| Variables/funcs | camelCase          | `getUserById`            |
| Classes         | PascalCase         | `UserService`            |
| Interfaces      | PascalCase         | `UserProfile`            |
| Type aliases    | PascalCase         | `ApiResponse`            |
| Enums           | PascalCase         | `HttpStatus`             |
| Constants       | SCREAMING_SNAKE    | `MAX_RETRY_COUNT`        |
| Files           | kebab-case         | `user-service.ts`        |

### Function Signatures

Always annotate parameter types and return types explicitly.

```typescript
// Good: explicit parameter and return types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Arrow functions
const formatUser = (user: User): string => `${user.name} <${user.email}>`;
```

### Async/Await

Use `async/await` over raw Promise chains. Always annotate the return type as `Promise<T>`.

```typescript
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch user ${id}`);
  return response.json() as Promise<User>;
}
```

## Express + TypeScript Patterns (if applicable)

### Typed Request/Response

```typescript
import { Request, Response, NextFunction } from "express";

interface CreateUserBody {
  name: string;
  email: string;
}

const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email } = req.body;
    // ...
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};
```

### Error Handling

Centralize error handling in a single Express error middleware. Do not throw raw strings — always throw `Error` instances.

## Git Conventions

### Branch Naming

```
feature/<short-description>
fix/<short-description>
chore/<short-description>
```

### Commit Messages

Follow Conventional Commits format:

```
feat: add user registration endpoint
fix: resolve null pointer in user service
chore: update dependencies
docs: add API documentation
refactor: extract validation logic to utility
```

### What to Commit

- **Do commit**: `src/`, `tests/`, `package.json`, `tsconfig.json`, `.gitignore`, `CLAUDE.md`
- **Do not commit**: `node_modules/`, `dist/`, `.env`, `*.log`

## Key AI Assistant Instructions

1. **Read before editing**: Always read a file before modifying it.
2. **Maintain strict TypeScript**: Do not introduce `any`, do not disable strict checks.
3. **Follow naming conventions**: Refer to the table above.
4. **No speculative abstractions**: Only add code that is directly required by the task.
5. **No unnecessary comments**: Only comment where logic is non-obvious.
6. **Run build to verify**: After making TypeScript changes, ensure `npm run build` passes.
7. **Keep this file updated**: When the project structure or conventions change, update CLAUDE.md accordingly.
8. **Commit to the correct branch**: Follow branch naming conventions and never push to `main`/`master` without approval.
