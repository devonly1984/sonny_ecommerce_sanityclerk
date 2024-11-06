import { Product } from "@/sanity.types";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
  };
  export interface BasketItem {
    product: Product;
    quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}
export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};