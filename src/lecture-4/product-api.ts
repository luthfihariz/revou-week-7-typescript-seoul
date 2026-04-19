export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderResult {
  success: boolean;
  message: string;
  orderId?: string;
}

const inventory: Product[] = [
  { id: 1, name: "TypeScript Handbook", price: 29.99, stock: 10 },
  { id: 2, name: "Jest Testing Guide", price: 19.99, stock: 5 },
  { id: 3, name: "Node.js Cookbook", price: 24.99, stock: 0 },
];

export async function getProduct(id: number): Promise<Product | null> {
  await delay(10);
  return inventory.find((p) => p.id === id) ?? null;
}

export async function getAllProducts(): Promise<Product[]> {
  await delay(10);
  return [...inventory];
}

export async function placeOrder(
  productId: number,
  quantity: number
): Promise<OrderResult> {
  await delay(10);

  if (quantity <= 0) {
    return { success: false, message: "Quantity must be greater than zero" };
  }

  const product = inventory.find((p) => p.id === productId);

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  if (product.stock < quantity) {
    return { success: false, message: "Insufficient stock" };
  }

  product.stock -= quantity;
  const orderId = `ORD-${Date.now()}`;
  return { success: true, message: "Order placed successfully", orderId };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
