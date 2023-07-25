"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { items, fullName, email, userEmail } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        items.map(async (item) => {
          const fetchedProduct = await fetch(
            `https://api.rawg.io/api/games/${item.id}?key=${process.env.RAWG_API_KEY}`
          );
          const product = await fetchedProduct.json();
          product.price = (product.added % 1000) / 10;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: Math.round(product.price * 1000) / 10,
            },
            quantity: item.quantity,
          };
        })
      );

      const totalPrice = await lineItems.reduce(
        (acc, cur) => acc + cur.price_data.unit_amount * cur.quantity,
        0
      );
      console.log(totalPrice);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url:
          "http://localhost:5173/checkout/success/?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173",
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: {
          fullName: fullName,
          stripeSessionId: session.id,
          userEmail,
          email,
          totalPrice,
          items,
        },
      });

      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));
