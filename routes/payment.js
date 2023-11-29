const express = require('express');
const router = express();
const stripe = require("stripe")("sk_test_51O7cEsCrff4nrJMoy9kX9ZTE1up57h6tV4cc7Sg4AR4YQyUNHFXOYWzJhYQHPt3tUN5fLG0z650mLUbDwy4wjgKa00xrwyFM7I"
, {
  apiVersion: "2023-10-16",
});

router.get("/", (req, res) => {
  const path = resolve("../client" + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: "pk_test_51O7cEsCrff4nrJMougdphFFiekJvVA5l460Ctf0FKzJY1U3o9GaU1QiVT4FgeurvyZuBZOARaWcOuzMKIePdihN800V6zrgKIH",
  });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;