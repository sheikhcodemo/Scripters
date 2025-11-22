// lib/stripe.ts
import Stripe from 'stripe';
import { Order } from './types';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function createCheckoutSession(order: Order) {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: order.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    })),
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
  });
}