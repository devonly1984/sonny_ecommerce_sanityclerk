"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { GroupedBasketItem, Metadata } from "@/lib/types";

export const createCheckoutSession = async (
  items: GroupedBasketItem[],
  metadata: Metadata
) => {
  let stub;
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }
    if (process.env.NODE_ENV ==='production') {
      stub = `https://${process.env.VERCEL_URL}`
    } else {
      stub = process.env.NEXT_PUBLIC_BASE_URL
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${stub}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
        },
        product_data: {
          name: item.product.name || "Unnamed Product",
          description: `Product ID: ${item.product._id}`,
          metadata: {
            id: item.product._id,
          },
          images: item.product.image
            ? [imageUrl(item.product.image).url()]
            : undefined,
        },
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
};