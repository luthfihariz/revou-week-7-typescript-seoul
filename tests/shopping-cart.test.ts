/**
 * Lecture Day 4 - Demo: Object-Oriented Checks
 *
 * Strategy: "If the state of any persistent objects is changed by running
 * the code, is the object updated correctly?"
 *
 * Run: npx jest tests/shopping-cart.test.ts
 */

import { ShoppingCart, CartItem } from "../src/day4/shopping-cart";

const laptop: CartItem = { id: "p1", name: "Laptop", price: 1000, quantity: 1 };
const mouse: CartItem = { id: "p2", name: "Mouse", price: 25, quantity: 2 };
const keyboard: CartItem = { id: "p3", name: "Keyboard", price: 75, quantity: 1 };

describe("ShoppingCart", () => {
  let cart: ShoppingCart;

  // beforeEach guarantees test isolation — each test gets a fresh cart
  beforeEach(() => {
    cart = new ShoppingCart();
  });

  // ─── Initial state ────────────────────────────────────────────────────────
  describe("initial state", () => {
    test("cart should be empty on creation", () => {
      expect(cart.isEmpty()).toBe(true);
      expect(cart.getItemCount()).toBe(0);
      expect(cart.getTotal()).toBe(0);
    });
  });

  // ─── addItem ──────────────────────────────────────────────────────────────
  describe("addItem — object state after adding", () => {
    test("cart is no longer empty after adding an item", () => {
      cart.addItem(laptop);

      expect(cart.isEmpty()).toBe(false);
    });

    test("item count reflects the total quantity added", () => {
      cart.addItem(laptop); // qty 1
      cart.addItem(mouse);  // qty 2

      expect(cart.getItemCount()).toBe(3);
    });

    // Object-oriented check: state of the cart object after adding same item twice
    test("adding the same item twice increases its quantity rather than duplicating", () => {
      cart.addItem(laptop);
      cart.addItem({ ...laptop, quantity: 2 });

      const items = cart.getItems();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3);
    });

    // toEqual performs deep equality — checks object structure, not reference
    test("getItems returns items matching the added data", () => {
      cart.addItem(laptop);

      expect(cart.getItems()[0]).toEqual({ ...laptop });
    });
  });

  // ─── removeItem ───────────────────────────────────────────────────────────
  describe("removeItem — object state after removing", () => {
    test("item is no longer in cart after removal", () => {
      cart.addItem(laptop);
      cart.addItem(mouse);
      cart.removeItem("p1");

      const ids = cart.getItems().map((i) => i.id);
      expect(ids).not.toContain("p1");
      expect(ids).toContain("p2");
    });

    test("removing a non-existent item does not throw", () => {
      expect(() => cart.removeItem("ghost")).not.toThrow();
    });
  });

  // ─── updateQuantity ───────────────────────────────────────────────────────
  describe("updateQuantity — object state after update", () => {
    test("item quantity is updated correctly", () => {
      cart.addItem(laptop);
      cart.updateQuantity("p1", 5);

      expect(cart.getItems()[0].quantity).toBe(5);
    });

    test("setting quantity to 0 removes the item from cart", () => {
      cart.addItem(laptop);
      cart.updateQuantity("p1", 0);

      expect(cart.isEmpty()).toBe(true);
    });

    test("throws when updating a non-existent item", () => {
      expect(() => cart.updateQuantity("ghost", 3)).toThrow("Item ghost not found in cart");
    });

    test("throws when setting a negative quantity", () => {
      cart.addItem(laptop);
      expect(() => cart.updateQuantity("p1", -1)).toThrow("Quantity cannot be negative");
    });
  });

  // ─── getTotal ─────────────────────────────────────────────────────────────
  describe("getTotal — logic check", () => {
    test("calculates total correctly for multiple items", () => {
      cart.addItem(laptop);   // 1000 × 1 = 1000
      cart.addItem(mouse);    // 25 × 2 = 50
      cart.addItem(keyboard); // 75 × 1 = 75

      expect(cart.getTotal()).toBe(1125);
    });

    test("returns 0 for an empty cart", () => {
      expect(cart.getTotal()).toBe(0);
    });
  });

  // ─── clear ────────────────────────────────────────────────────────────────
  describe("clear — resets object state", () => {
    test("cart is empty after clear", () => {
      cart.addItem(laptop);
      cart.addItem(mouse);
      cart.clear();

      expect(cart.isEmpty()).toBe(true);
      expect(cart.getTotal()).toBe(0);
    });
  });
});
