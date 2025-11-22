// lib/atlos.ts
import { Order } from './types';

const ATLOS_API = 'https://api.atlos.io/v1';

interface AtlosPayment {
  id: string;
  checkout_url: string;
  status: 'pending' | 'paid' | 'expired';
}

export async function createAtlosPayment(order: Order): Promise<AtlosPayment> {
  const res = await fetch(`${ATLOS_API}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-Id': process.env.ATLOS_MERCHANT_ID!,
      'X-Api-Secret': process.env.ATLOS_API_SECRET!,
    },
    body: JSON.stringify({
      amount: order.total,
      currency: 'USD',
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/atlos`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
    }),
  });

  if (!res.ok) throw new Error('Failed to create Atlos payment');
  return res.json();
}

export function verifyAtlosWebhook(payload: string, signature: string): boolean {
  const crypto = require('crypto');
  const expected = crypto
    .createHmac('sha256', process.env.ATLOS_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}