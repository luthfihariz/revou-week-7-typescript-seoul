// ============================================================
// Lecture 1 — Slides 40–48
// Functions
// ============================================================
// Topics:
//   - Typed parameters and return types
//   - Void functions
//   - Function type inference
//   - Optional parameters (?)
//   - Default parameters
//   - Rest parameters (...)
// ============================================================
// ============================================================
// PART 1: Typed Parameters and Return Type (Slide 40–41)
// ============================================================
// Syntax: function name(param: type): returnType { }
function add(a, b) {
    return a + b;
}
console.log(add(3, 4)); // 7
// console.log(add('10', '20'));
// Error: Argument of type 'string' is not assignable to parameter of type 'number'
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Hello, Alice!
// ============================================================
// PART 2: Void Function (Slide 42)
// ============================================================
// Use `void` when the function does NOT return a value.
function lowerCase(message) {
    console.log(message.toLowerCase());
}
lowerCase("HELLO REVOU"); // hello revou
// You cannot use the return value:
// let result = lowerCase("hello"); // result is void — useless
function logError(message) {
    console.log(`[ERROR] ${message}`);
}
logError("Something went wrong");
// ============================================================
// PART 3: Function Type Inference (Slide 43)
// ============================================================
// If you omit the return type, TypeScript tries to infer it.
function multiply(a, b) {
    return a * b; // TypeScript infers return type: number
}
console.log(multiply(4, 5)); // 20
// Caution: if different branches return different types,
// TypeScript infers a union — or even `any` in complex cases.
// It's safer to annotate the return type explicitly.
// ============================================================
// PART 4: Optional Parameters (Slides 44–45)
// ============================================================
// Add `?` after a parameter name to make it optional.
// TypeScript will NOT error if you omit that argument.
function addOptional(a, b, c) {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
}
console.log(addOptional(10, 20)); // 30  (c is undefined)
console.log(addOptional(10, 20, 5)); // 35  (c is 5)
function createProfile(name, bio) {
    return bio ? `${name}: ${bio}` : name;
}
console.log(createProfile("Alice")); // Alice
console.log(createProfile("Alice", "Developer")); // Alice: Developer
// ============================================================
// PART 5: Default Parameters (Slide 46)
// ============================================================
// Comparison: JavaScript vs TypeScript default parameters
// JavaScript version:
function finalPriceJS(price, discount = 0) {
    return price * (1 - discount);
}
// TypeScript version — same idea, but types are explicit:
function finalPriceTS(price, discount = 0) {
    return price * (1 - discount);
}
console.log(finalPriceJS(100)); // 100 (0% discount)
console.log(finalPriceTS(100)); // 100
console.log(finalPriceTS(100, 0.05)); // 95  (5% discount)
// ============================================================
// PART 6: Rest Parameters (Slides 47–48)
// ============================================================
// Use `...` to accept any number of arguments of the same type.
// Rules:
//   - Only ONE rest parameter per function
//   - Must be the LAST parameter
//   - Type is always an array: type[]
function totalNum(...numbers) {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}
console.log(totalNum()); // 0
console.log(totalNum(10, 20)); // 30
console.log(totalNum(10, 20, 30)); // 60
// Real-world: join words into a sentence
function joinWords(separator, ...words) {
    return words.join(separator);
}
console.log(joinWords(", ", "apple", "banana", "mango")); // apple, banana, mango
console.log(joinWords(" - ", "TypeScript", "is", "great")); // TypeScript - is - great
export {};
