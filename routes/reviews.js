const express = require("express");
const router = express.Router();
const Review = require("../models/review")

router.get("/:id", async (req, res) => {
  try {
    productId=req.params.id;
    const review = await Review.find({ productId});

    res.json(review);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.post('/', async (req, res) => {

    const { productId, customerName, rating, reviewText} = req.body;
  
    const newReview = new Review ({
      productId,
      customerName,
      rating,
      reviewText
    });

    await newReview.save();
  
    res.status(201).json(newReview);
  });
  
  
module.exports = router;