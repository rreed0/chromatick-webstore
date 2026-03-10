export type CartItemInput = {
  productId: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "chromatick-cart";

export function sanitizeQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;

  return Math.min(10, Math.max(1, Math.floor(value)));
}

export function sanitizeCartItems(items: CartItemInput[]) {
  const merged = new Map<string, number>();

  for (const item of items) {
    if (!item.productId) continue;

    merged.set(
      item.productId,
      sanitizeQuantity((merged.get(item.productId) ?? 0) + item.quantity),
    );
  }

  return Array.from(merged, ([productId, quantity]) => ({
    productId,
    quantity,
  }));
}
