import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

// Define types for cart items
type CartItem = {
  title: string;
  price: number;
  quantity: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Get cart items from the request body
      const body = req.body as CartItem[];

      console.log("body", body);

      // Map cart items to Stripe line items
      const lineItems = body.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, // Convert price to cents
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      }));

      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        invoice_creation: {
          enabled: true,
        },
        line_items: lineItems,
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/canceled`,
      };

      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create(params);

      return res.status(200).json({ session });
    } catch (err: any) {
      console.error(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
