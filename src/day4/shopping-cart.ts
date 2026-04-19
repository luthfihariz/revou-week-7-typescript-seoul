export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  private items: CartItem[] = [];

  addItem(item: CartItem): void {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  updateQuantity(id: string, quantity: number): void {
    if (quantity < 0) throw new Error("Quantity cannot be negative");
    if (quantity === 0) {
      this.removeItem(id);
      return;
    }
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new Error(`Item ${id} not found in cart`);
    item.quantity = quantity;
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getItemCount(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
