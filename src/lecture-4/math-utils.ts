export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new Error("min cannot be greater than max");
  return Math.min(Math.max(value, min), max);
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function factorial(n: number): number {
  if (!Number.isInteger(n)) throw new Error("factorial requires an integer");
  if (n < 0) throw new Error("factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

export function average(numbers: number[]): number {
  if (numbers.length === 0) throw new Error("Cannot compute average of empty array");
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}
