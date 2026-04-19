// ============================================================
// Lecture 4 — cart.ts
// Functional cart — no classes, just interfaces + functions.
// Uses: interfaces (L2), typed arrays (L1), union types (L2).
//
// Key idea: instead of a Cart object that mutates itself,
// every function takes a Cart and returns a NEW Cart.
// The original is never modified (immutable approach).
// ============================================================

// ---- TYPES ------------------------------------------------

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

// ---- FUNCTIONS --------------------------------------------

export function createCart(): Cart {
  return { items: [] };
}

export function addItem(cart: Cart, item: CartItem): Cart {
  const existing = cart.items.find((i) => i.id === item.id);
  if (existing) {
    // Item already in cart — increase quantity instead of duplicating
    return {
      items: cart.items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      ),
    };
  }
  return { items: [...cart.items, item] };
}

export function removeItem(cart: Cart, id: string): Cart {
  return { items: cart.items.filter((i) => i.id !== id) };
}

export function updateQuantity(cart: Cart, id: string, quantity: number): Cart {
  if (quantity < 0) throw new Error("Quantity cannot be negative");
  if (quantity === 0) return removeItem(cart, id);

  const exists = cart.items.some((i) => i.id === id);
  if (!exists) throw new Error(`Item ${id} not found in cart`);

  return {
    items: cart.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
  };
}

export function getTotal(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getItemCount(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function isEmpty(cart: Cart): boolean {
  return cart.items.length === 0;
}

export function clearCart(): Cart {
  return { items: [] };
}
