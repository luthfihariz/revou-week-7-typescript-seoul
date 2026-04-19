export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (maxLength < 0) throw new Error("maxLength must be non-negative");
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function countWords(str: string): number {
  if (str.trim().length === 0) return 0;
  return str.trim().split(/\s+/).length;
}

export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

export function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(" ");
}
