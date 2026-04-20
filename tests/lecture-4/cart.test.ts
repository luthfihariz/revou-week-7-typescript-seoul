// ============================================================
// Lecture 4 — cart.test.ts
// Tests for functional cart — interfaces + immutable functions.
// ============================================================

import {
  createCart,
  addItem,
  removeItem,
  updateQuantity,
  getTotal,
  getItemCount,
  isEmpty,
  clearCart,
  CartItem,
} from "../../src/lecture-4/cart";

const nasiGoreng: CartItem = { id: "1", name: "Nasi Goreng", price: 25000, quantity: 1 };
const esTeh: CartItem      = { id: "2", name: "Es Teh",      price: 8000,  quantity: 2 };

describe("createCart", () => {
  test("creates an empty cart", () => {
    const cart = createCart();
    expect(cart.items).toEqual([]);
  });
});

describe("isEmpty", () => {
  test("returns true for a new cart", () => {
    expect(isEmpty(createCart())).toBe(true);
  });

  test("returns false after adding an item", () => {
    const cart = addItem(createCart(), nasiGoreng);
    expect(isEmpty(cart)).toBe(false);
  });
});

describe("addItem", () => {
  test("adds a new item to the cart", () => {
    const cart = addItem(createCart(), nasiGoreng);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].name).toBe("Nasi Goreng");
  });

  test("increases quantity when adding the same item twice", () => {
    let cart = addItem(createCart(), nasiGoreng);
    cart = addItem(cart, { ...nasiGoreng, quantity: 2 });
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  test("does not mutate the original cart", () => {
    const original = createCart();
    addItem(original, nasiGoreng);
    expect(original.items).toHaveLength(0);
  });
});

describe("removeItem", () => {
  test("removes the item with the given id", () => {
    let cart = addItem(createCart(), nasiGoreng);
    cart = addItem(cart, esTeh);
    cart = removeItem(cart, "1");
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].id).toBe("2");
  });

  test("does nothing when id does not exist", () => {
    const cart = addItem(createCart(), nasiGoreng);
    const result = removeItem(cart, "999");
    expect(result.items).toHaveLength(1);
  });
});

describe("updateQuantity", () => {
  test("updates the quantity of an existing item", () => {
    let cart = addItem(createCart(), nasiGoreng);
    cart = updateQuantity(cart, "1", 5);
    expect(cart.items[0].quantity).toBe(5);
  });

  test("removes the item when quantity is set to 0", () => {
    let cart = addItem(createCart(), nasiGoreng);
    cart = updateQuantity(cart, "1", 0);
    expect(isEmpty(cart)).toBe(true);
  });

  test("throws when quantity is negative", () => {
    const cart = addItem(createCart(), nasiGoreng);
    expect(() => updateQuantity(cart, "1", -1)).toThrow("Quantity cannot be negative");
  });

  test("throws when item does not exist", () => {
    const cart = createCart();
    expect(() => updateQuantity(cart, "999", 3)).toThrow("not found");
  });
});

describe("getTotal", () => {
  test("returns 0 for an empty cart", () => {
    expect(getTotal(createCart())).toBe(0);
  });

  test("calculates total correctly for multiple items", () => {
    let cart = addItem(createCart(), nasiGoreng); // 25000 x1 = 25000
    cart = addItem(cart, esTeh);                  // 8000  x2 = 16000
    expect(getTotal(cart)).toBe(41000);
  });
});

describe("getItemCount", () => {
  test("returns total quantity across all items", () => {
    let cart = addItem(createCart(), nasiGoreng); // qty 1
    cart = addItem(cart, esTeh);                  // qty 2
    expect(getItemCount(cart)).toBe(3);
  });
});

describe("clearCart", () => {
  test("returns an empty cart", () => {
    const cart = clearCart();
    expect(isEmpty(cart)).toBe(true);
  });
});
