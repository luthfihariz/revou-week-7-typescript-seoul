# Lecture 3 — Project Setup Guide

Starting from Lecture 3, we use a **proper TypeScript project** with:
- `package.json` — declares the project and its dependencies
- `tsconfig.json` — configures the TypeScript compiler

No extra tools needed — Node.js v22+ can run TypeScript natively.

---

## Why do we need this now?

Lecture 1 and 2 compiled single files directly:
```bash
tsc hello.ts
node hello.js
```

That works for one file. But once we start **importing from other files** (modules),
we need the compiler to understand the whole project structure — that's what
`tsconfig.json` is for.

---

## Step 1 — Make sure Node.js is installed

```bash
node --version    # should print v22.x or higher (v24 LTS recommended)
npm --version     # should print 9.x or higher
```

If not installed, download from: https://nodejs.org

---

## Step 2 — Create package.json

`package.json` is the **identity card** of your project. It stores:
- Project name, version, description
- Which packages (dependencies) the project needs
- Shortcut scripts (`npm run build`, `npm run type-check`, etc.)

### Option A — interactive (asks you questions)
```bash
npm init
```

### Option B — instant with defaults (fastest)
```bash
npm init -y
```

Both produce a `package.json` file. Then add your scripts to it:
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  }
}
```

> **No `"type": "module"` needed.**
> By default, Node.js uses CommonJS — the classic module system where files use
> `require()` to load each other. Our TypeScript source can still use the modern
> `import`/`export` syntax; TypeScript compiles it to `require()` for us.```
> `"type": "module"` switches to ESM (ES Modules), which is more modern but
> requires explicit file extensions in import paths — which gets confusing.
> CommonJS keeps things simple for learning.

---

## Step 3 — Install TypeScript

```bash
npm install --save-dev typescript
```

`--save-dev` (or `-D`) means TypeScript is a **development tool** — needed
when writing and building code, not at runtime.

After this, your `package.json` will have:
```json
{
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

And a `node_modules/` folder appears with TypeScript downloaded inside it.

> **Never commit `node_modules/`** — it can be hundreds of MB. The `.gitignore`
> already excludes it. Anyone who clones the repo just runs `npm install` to
> recreate it from `package.json`.

---

## Step 4 — Add scripts to package.json

```json
{
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  }
}
```

| Script | Command | What it does |
|--------|---------|-------------|
| `npm run build` | `tsc` | Compiles all `.ts` → `.js` in `dist/` |
| `npm run type-check` | `tsc --noEmit` | Checks types only, no output files |

---

## Step 5 — Create tsconfig.json

Run this to generate one:
```bash
./node_modules/.bin/tsc --init
```

Or create it manually:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "lib": ["ES2022", "DOM"],
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Why we configured tsconfig this way

Every option has a reason. Here's the thinking behind each choice.

---

### `"target": "ES2022"` — match your runtime

`target` controls which JavaScript version `tsc` outputs. Think of it as the
minimum JavaScript version your runtime (Node.js) needs to understand.

```
TypeScript source  →  tsc  →  JavaScript (target version)
```

If you set `target: "ES5"`, TypeScript downgrades your modern code:
```typescript
// You write this (ES2017)
const greet = async (name: string) => `Hello ${name}`;
```
```javascript
// ES5 output — ugly, hard to read
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) { ... }
var greet = function(name) { return __awaiter(void 0, void 0, void 0, function() { ... }) }
```

With `target: "ES2022"`, your code comes out clean because Node 24 already
understands all of ES2022 natively — no downgrading needed:
```javascript
// ES2022 output — exactly what you wrote, just without the types
const greet = async (name) => `Hello ${name}`;
```

**Rule:** set `target` to match the JavaScript version your Node.js version supports.
Node 24 LTS fully supports ES2022, so that's our ceiling.

---

### `"module": "Node16"` — tell tsc how to compile imports

`module` controls what the compiled `import`/`export` statements look like in
the output JavaScript.

```typescript
// Your TypeScript source (what you write)
import { add } from "./math";
```

| `module` value | Compiled output |
|----------------|-----------------|
| `Node16`       | `const { add } = require("./math")` |
| `NodeNext`     | `import { add } from "./math.js"` (needs explicit `.js`) |

We use `Node16` because our project has no `"type": "module"` in `package.json`,
so Node treats all files as CommonJS. TypeScript follows that rule and compiles
`import`/`export` to `require()`/`module.exports` automatically.

No file extensions needed in import paths — you just write `"./cart"` and
everything resolves correctly.

> **Why not `NodeNext`?**
> `NodeNext` follows strict ESM rules which require explicit `.js` extensions
> in every import — `import { foo } from "./cart.js"` even though the file is
> `cart.ts`. That's confusing. `Node16` with CommonJS avoids this entirely.

---

### `"moduleResolution": "Node16"` — tell tsc how to find files

`moduleResolution` is about **how TypeScript finds the files you import** —
not the compiled output, but the source resolution at compile time.

```typescript
import { add } from "./math";
//                    ^^^^^^ TypeScript needs to locate this file
```

`Node16` mirrors exactly how Node.js v16+ resolves CommonJS files:
- No file extension required — `"./math"` finds `math.ts` automatically
- Works the same way as `require()` in plain JavaScript

> **Why do `module` and `moduleResolution` need to match?**
> `module` describes the output. `moduleResolution` describes the input lookup.
> If they use different rules, TypeScript's compile-time checks won't reflect
> what actually happens when Node runs the code. `Node16` + `Node16` always
> go together.

---

### `"outDir": "./dist"` and `"rootDir": "./src"` — keep source and output separate

```
src/             ← your TypeScript source (what you edit)
  index.ts
  utils/
    format.ts

dist/            ← compiled output (what Node runs in production)
  index.js
  utils/
    format.js
```

Without these, `tsc` dumps `.js` files next to your `.ts` files — messy.
With them, `src/` stays clean and `dist/` is fully gitignored.

`rootDir` also tells `tsc` the root of your project so it mirrors the folder
structure correctly inside `dist/`.

---

### `"strict": true` — turn on all safety checks

A single flag that enables a whole suite of checks TypeScript would otherwise
skip. It's the difference between TypeScript being a safety net vs just
decoration.

The most important checks it enables:

| Check | Without strict | With strict |
|-------|---------------|-------------|
| `noImplicitAny` | `function add(a, b)` — silent `any` | ❌ Error: must type params |
| `strictNullChecks` | `let name: string = null` — allowed | ❌ Error: null not assignable |
| `strictPropertyInitialization` | Class fields can be unset | ❌ Error: must initialise |

Always use `strict: true`. The only reason not to is when migrating a very
large legacy JavaScript codebase to TypeScript — you might turn it on gradually.
For new projects, there's no reason to skip it.

---

### `"lib": ["ES2022", "DOM"]` — which built-in types are available

TypeScript needs to know what globals exist in your environment. `lib` tells it
which type definitions to include.

- **`ES2022`** — gives you types for JavaScript built-ins: `Math`, `Array`,
  `Promise`, `Date`, `Object.hasOwn()`, etc.
- **`DOM`** — gives you types for browser globals that Node also ships:
  `console`, `setTimeout`, `setInterval`, `fetch`, `URL`, etc.

Without `DOM`, TypeScript doesn't know what `console.log` is — you'd get a
compile error on the very first line of every file.

> **Why DOM in a Node project?**
> Historically `console`, `setTimeout`, and `fetch` were browser APIs. TypeScript
> puts their type definitions in `lib.dom`. Node.js adopted them too, but
> TypeScript hasn't split them into a separate Node-only lib yet. Adding `DOM`
> is the pragmatic fix — it gives us those globals without needing `@types/node`.

---

### `"skipLibCheck": true` — don't type-check node_modules

Type definitions inside `node_modules` (`.d.ts` files) sometimes have minor
errors or conflicts between packages. `skipLibCheck` tells TypeScript to ignore
those and only check **your** code.

Without it, you might see baffling errors from code you didn't write and can't
fix. It's safe to skip because you trust the packages you installed.

---

### `"include"` and `"exclude"` — scope of compilation

```json
"include": ["src/**/*"],
"exclude": ["node_modules", "dist"]
```

- `include` — only compile files inside `src/`. TypeScript won't touch anything
  outside it.
- `exclude` — even if something matches `include`, skip these folders.
  `node_modules` must be excluded or TypeScript tries to compile every package
  you installed. `dist` must be excluded or TypeScript tries to re-compile
  its own output on the next build.

---

### The full picture — how all options connect

```
Your .ts files (src/)
        │
        │  TypeScript reads them
        │  moduleResolution: Node16 — finds ./cart → cart.ts automatically
        │
        ▼
   Type checking
        │  strict: true — enforces all safety rules
        │  lib: [ES2022, DOM] — knows what globals exist
        │
        ▼
   Compilation
        │  target: ES2022 — output modern JS, no ugly downgrading
        │  module: Node16 — converts import/export → require/module.exports
        │
        ▼
Output .js files (dist/)
        │
        ▼
   node dist/index.js — runs cleanly in Node 24
```

---

## Step 6 — Two modes: development vs production

There are two ways to run TypeScript files. Each has a different purpose.

---

### Mode 1 — Development (run `.ts` directly)

Node.js v22+ can run TypeScript files natively — it strips the type annotations
on the fly and executes the JavaScript underneath. No compilation step needed.

**Single-file demos (lecture-1, lecture-2, lecture-3 review):**
```bash
node src/lecture-1/03-number.ts
node src/lecture-2/01-interface.ts
node src/lecture-3/00-review.ts
```

**Files with enums** need an extra flag — enums generate new JavaScript code
(not just type annotations), so Node needs permission to transform them:
```bash
node --experimental-transform-types src/lecture-3/02-enums.ts
node --experimental-transform-types src/lecture-3/03-best-practices.ts
```

**Multi-file modules** cannot run natively in development mode. When `index.ts`
imports from `./cart.js`, Node looks for a real `cart.js` file — but in `src/`
there is only `cart.ts`. Use production mode (Mode 2) for module demos.

> **Why does this limitation exist?**
> Node's native TypeScript support only *strips* type annotations — it does not
> rewrite import paths. So `import from "./cart.js"` stays as-is, and Node will
> look for a real `.js` file. That file only exists after compilation.

---

### Mode 2 — Production (compile then run `.js`)

This is the real workflow: compile TypeScript → run JavaScript.

```bash
npm run build                    # tsc: compiles src/ → dist/
node dist/lecture-3/00-review.js
node dist/lecture-3/01-modules/index.js    # ← multi-file modules work here
node dist/lecture-3/02-enums.js            # ← no extra flag needed
node dist/lecture-3/03-best-practices.js
```

After `npm run build`, `dist/` mirrors `src/` exactly — every `.ts` becomes a
clean `.js` with the types stripped. Students can open `dist/` to see what
TypeScript actually compiles down to.

> **Why use production mode?**
> - Shows students the compiled output — they can compare `.ts` source vs `.js` output
> - Works for all file types including enums and multi-file modules
> - This is exactly how real projects deploy: compile once, run the JS

---

### Type checking only (no output files)
```bash
npm run type-check
```
Runs `tsc --noEmit` — checks all types across the project but produces no files.
Use this to catch errors before running.

---

### Quick comparison

| What you want | Command |
|---------------|---------|
| Run a single-file demo quickly | `node src/lecture-X/file.ts` |
| Run a file with enums natively | `node --experimental-transform-types src/...` |
| Run the modules demo | `npm run build && node dist/lecture-3/01-modules/index.js` |
| Run ALL compiled files | `npm run build`, then `node dist/...` |
| Check types without running | `npm run type-check` |

---

## What does `"strict": true` turn on?

| Check | What it catches |
|-------|----------------|
| `noImplicitAny` | Parameters without type annotations |
| `strictNullChecks` | Assigning `null`/`undefined` to typed variables |
| `strictFunctionTypes` | Incorrect function parameter types |

Without strict:
```typescript
let name: string = null;   // allowed — dangerous!
function add(a, b) { ... } // a and b are silently `any`
```

With strict:
```typescript
let name: string = null;   // ❌ Error: null not assignable to string
function add(a, b) { ... } // ❌ Error: Parameter 'a' implicitly has an 'any' type
```

---

## Quick reference — setup from zero

```bash
# 1. create project folder
mkdir my-project && cd my-project

# 2. create package.json
npm init -y

# 3. add "type": "module" to package.json (open in editor)

# 4. install TypeScript
npm install --save-dev typescript

# 5. create tsconfig.json
./node_modules/.bin/tsc --init

# 6. create your first file
mkdir src
echo "console.log('Hello TypeScript')" > src/index.ts

# 7. run it
node src/index.ts
```

---

## Project structure

```
revou-week-7-typescript-seoul/
├── package.json          ← project identity + dependencies
├── package-lock.json     ← exact versions locked (commit this)
├── tsconfig.json         ← TypeScript compiler config
├── node_modules/         ← downloaded packages (DO NOT commit)
├── src/
│   ├── lecture-1/        ← dev: node file.ts  |  prod: node dist/lecture-1/file.js
│   ├── lecture-2/        ← dev: node file.ts  |  prod: node dist/lecture-2/file.js
│   └── lecture-3/
│       ├── SETUP.md      ← you are here
│       ├── 00-review.ts  ← dev: node src/lecture-3/00-review.ts
│       ├── 01-modules/   ← prod only: npm run build → node dist/lecture-3/01-modules/index.js
│       │   ├── cart.ts
│       │   └── index.ts
│       ├── 02-enums.ts   ← dev: node --experimental-transform-types src/lecture-3/02-enums.ts
│       └── 03-best-practices.ts
└── dist/                 ← compiled JS output (gitignored, recreate with npm run build)
```
