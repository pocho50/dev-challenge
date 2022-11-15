import Stripe from "stripe";
import type Package from "@/types/Package";
export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const totalPrice: number = body.price;

  const stripe = new Stripe(useRuntimeConfig().stripeSecret);

  const product = await stripe.products.create({
    name: "Flight Packages",
  });

  const price = await stripe.prices.create({
    unit_amount: Math.round(totalPrice * 100),
    currency: "usd",
    product: product.id,
  });

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "https://inkuba.com/",
    cancel_url: "https://inkuba.com/",
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
  });

  return checkout.url;
});
