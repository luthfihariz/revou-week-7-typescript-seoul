/**
 * Lecture Day 4 - Demo: Async Testing
 *
 * Real applications make async calls (database, API, file system).
 * Jest supports async/await — just mark the test callback as async.
 *
 * Run: npx jest tests/product-api.test.ts
 */

import { getProduct, getAllProducts, placeOrder } from "../src/day4/product-api";

// ─── getProduct ───────────────────────────────────────────────────────────────
describe("getProduct", () => {
  test("resolves with the correct product for a valid id", async () => {
    const product = await getProduct(1);

    // toEqual checks the full object structure
    expect(product).toEqual({
      id: 1,
      name: "TypeScript Handbook",
      price: 29.99,
      stock: 10,
    });
  });

  test("resolves with null for an unknown id", async () => {
    const product = await getProduct(999);

    expect(product).toBeNull();
  });
});

// ─── getAllProducts ───────────────────────────────────────────────────────────
describe("getAllProducts", () => {
  test("resolves with an array of products", async () => {
    const products = await getAllProducts();

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test("each product has id, name, price, and stock fields", async () => {
    const products = await getAllProducts();

    products.forEach((p) => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("price");
      expect(p).toHaveProperty("stock");
    });
  });
});

// ─── placeOrder ───────────────────────────────────────────────────────────────
describe("placeOrder", () => {
  // Logic check: successful order
  test("resolves with success and an orderId for a valid order", async () => {
    const result = await placeOrder(2, 1);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Order placed successfully");
    expect(result.orderId).toBeDefined();
    expect(typeof result.orderId).toBe("string");
  });

  // Error handling: product out of stock
  test("resolves with failure when product is out of stock", async () => {
    const result = await placeOrder(3, 1); // product 3 has stock: 0

    expect(result.success).toBe(false);
    expect(result.message).toBe("Insufficient stock");
  });

  // Error handling: product does not exist
  test("resolves with failure for a non-existent product", async () => {
    const result = await placeOrder(999, 1);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Product not found");
  });

  // Boundary check: quantity must be positive
  test("resolves with failure when quantity is zero", async () => {
    const result = await placeOrder(1, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Quantity must be greater than zero");
  });

  test("resolves with failure for a negative quantity", async () => {
    const result = await placeOrder(1, -5);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Quantity must be greater than zero");
  });

  // Object-oriented check: stock decreases after a successful order
  test("reduces available stock after a successful order", async () => {
    const before = await getProduct(1);
    const stockBefore = before!.stock;

    await placeOrder(1, 3);

    const after = await getProduct(1);
    expect(after!.stock).toBe(stockBefore - 3);
  });
});
