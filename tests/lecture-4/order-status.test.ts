// ============================================================
// Lecture 4 — order-status.test.ts
// Tests for order lifecycle — enums (L3) + interfaces (L2).
// ============================================================

import {
  createOrder,
  confirmOrder,
  shipOrder,
  cancelOrder,
  canCancel,
  applyDiscount,
  OrderStatus,
} from "../../src/lecture-4/order-status";

describe("createOrder", () => {
  test("creates an order with Pending status", () => {
    const order = createOrder("Budi", ["Nasi Goreng", "Es Teh"], 33000);
    expect(order.status).toBe(OrderStatus.Pending);
  });

  test("stores customer name and items correctly", () => {
    const order = createOrder("Siti", ["Mie Goreng"], 20000);
    expect(order.customerName).toBe("Siti");
    expect(order.items).toContain("Mie Goreng");
  });

  test("throws when items list is empty", () => {
    expect(() => createOrder("Budi", [], 10000)).toThrow("at least one item");
  });

  test("throws when total is zero or negative", () => {
    expect(() => createOrder("Budi", ["Nasi"], 0)).toThrow("greater than zero");
    expect(() => createOrder("Budi", ["Nasi"], -5000)).toThrow("greater than zero");
  });
});

describe("confirmOrder", () => {
  test("moves a Pending order to Confirmed", () => {
    const order = createOrder("Budi", ["Nasi Goreng"], 25000);
    const confirmed = confirmOrder(order);
    expect(confirmed.status).toBe(OrderStatus.Confirmed);
  });

  test("throws when order is not Pending", () => {
    const order = createOrder("Budi", ["Nasi"], 25000);
    const confirmed = confirmOrder(order);
    expect(() => confirmOrder(confirmed)).toThrow("Cannot confirm");
  });
});

describe("shipOrder", () => {
  test("moves a Confirmed order to Shipped", () => {
    const order = confirmOrder(createOrder("Budi", ["Nasi"], 25000));
    const shipped = shipOrder(order);
    expect(shipped.status).toBe(OrderStatus.Shipped);
  });

  test("throws when order is not Confirmed", () => {
    const order = createOrder("Budi", ["Nasi"], 25000);
    expect(() => shipOrder(order)).toThrow("Cannot ship");
  });
});

describe("cancelOrder", () => {
  test("cancels a Pending order", () => {
    const order = createOrder("Budi", ["Nasi"], 25000);
    const cancelled = cancelOrder(order);
    expect(cancelled.status).toBe(OrderStatus.Cancelled);
  });

  test("cancels a Confirmed order", () => {
    const order = confirmOrder(createOrder("Budi", ["Nasi"], 25000));
    const cancelled = cancelOrder(order);
    expect(cancelled.status).toBe(OrderStatus.Cancelled);
  });

  test("throws when order is already Shipped", () => {
    const order = shipOrder(confirmOrder(createOrder("Budi", ["Nasi"], 25000)));
    expect(() => cancelOrder(order)).toThrow("Cannot cancel");
  });
});

describe("canCancel", () => {
  test("returns true for Pending", () => {
    const order = createOrder("Budi", ["Nasi"], 25000);
    expect(canCancel(order)).toBe(true);
  });

  test("returns true for Confirmed", () => {
    const order = confirmOrder(createOrder("Budi", ["Nasi"], 25000));
    expect(canCancel(order)).toBe(true);
  });

  test("returns false for Shipped", () => {
    const order = shipOrder(confirmOrder(createOrder("Budi", ["Nasi"], 25000)));
    expect(canCancel(order)).toBe(false);
  });
});

describe("applyDiscount", () => {
  test("reduces the total by the given percentage", () => {
    const order = createOrder("Budi", ["Nasi"], 100000);
    const discounted = applyDiscount(order, 10);
    expect(discounted.total).toBe(90000);
  });

  test("does not change the order status", () => {
    const order = createOrder("Budi", ["Nasi"], 100000);
    const discounted = applyDiscount(order, 20);
    expect(discounted.status).toBe(OrderStatus.Pending);
  });

  test("throws for a negative discount", () => {
    const order = createOrder("Budi", ["Nasi"], 100000);
    expect(() => applyDiscount(order, -10)).toThrow("Discount must be between 0 and 100");
  });

  test("throws for a discount over 100", () => {
    const order = createOrder("Budi", ["Nasi"], 100000);
    expect(() => applyDiscount(order, 110)).toThrow("Discount must be between 0 and 100");
  });
});
