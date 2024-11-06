"use server";

import { GroupedBasketItem, Metadata } from "@/lib/types";

export const createCheckoutSession = async ({
  groupedItems,
  metadata,
}: {
  groupedItems: GroupedBasketItem[];
  metadata: Metadata;
}) => {
    try {
        const itemsWithoutPrice = groupedItems.filter(item=>!item.product.price);
        if (itemsWithoutPrice.length >0) {
            throw new Error("Some items do not have a price");
        }
    } catch (error) {
        console.error("Error creating checkout session",error);
        throw error;
    }
};