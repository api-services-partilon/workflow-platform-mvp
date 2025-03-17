import { Hono } from "hono";
import { stripe } from "../../../lib/stripe";
// import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono().post("/", async (c) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await c.req.text(),
      c.req.header.get("stripe-signature"),
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const errorMessage = err.message;
    // On error, log and return the error message.
    if (err) console.log(err);
    console.log(`Error message: ${errorMessage}`);
    return c.json({ message: `Webhook Error: ${errorMessage}` }, 400);
  }

  const permittedEvents = ["checkout.session.completed"];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object;
          console.log(`CheckoutSession status: ${data.payment_status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return c.json({ message: "Webhook handler failed" }, 500);
    }
  }
  // Return a response to acknowledge receipt of the event.
  return c.json({ message: "Received" }, 200);
});

export default app;
