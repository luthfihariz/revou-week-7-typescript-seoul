// ============================================================
// Lecture 4 — order-status.ts
// Order management using enums (L3) + interfaces (L2) + functions (L1).
//
// Enums make status transitions readable and safe —
// you can't accidentally pass "shiped" (typo) as a status.
// ============================================================

// ---- TYPES ------------------------------------------------

export enum OrderStatus {
  Pending   = "PENDING",
  Confirmed = "CONFIRMED",
  Shipped   = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: OrderStatus;
}

// ---- FUNCTIONS --------------------------------------------

export function createOrder(
  customerName: string,
  items: string[],
  total: number
): Order {
  if (items.length === 0) throw new Error("Order must have at least one item");
  if (total <= 0) throw new Error("Order total must be greater than zero");

  return {
    id: `ORD-${Date.now()}`,
    customerName,
    items,
    total,
    status: OrderStatus.Pending,
  };
}

export function confirmOrder(order: Order): Order {
  if (order.status !== OrderStatus.Pending) {
    throw new Error(`Cannot confirm an order with status: ${order.status}`);
  }
  return { ...order, status: OrderStatus.Confirmed };
}

export function shipOrder(order: Order): Order {
  if (order.status !== OrderStatus.Confirmed) {
    throw new Error(`Cannot ship an order with status: ${order.status}`);
  }
  return { ...order, status: OrderStatus.Shipped };
}

export function cancelOrder(order: Order): Order {
  if (
    order.status === OrderStatus.Shipped ||
    order.status === OrderStatus.Delivered
  ) {
    throw new Error(`Cannot cancel an order with status: ${order.status}`);
  }
  return { ...order, status: OrderStatus.Cancelled };
}

export function canCancel(order: Order): boolean {
  return (
    order.status === OrderStatus.Pending ||
    order.status === OrderStatus.Confirmed
  );
}

export function applyDiscount(order: Order, discountPercent: number): Order {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount must be between 0 and 100");
  }
  const discountAmount = order.total * (discountPercent / 100);
  return { ...order, total: order.total - discountAmount };
}
