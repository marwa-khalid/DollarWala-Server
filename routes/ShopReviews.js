const express = require("express");
const router = express.Router();
const Review = require("../models/ShopReviews")

router.get("/", async (req, res) => {
  try {
   
    const review = await Review.find();

    res.json(review);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.post('/', async (req, res) => {

    const {  customerName, rating, reviewText} = req.body;
  
    const newReview = new Review ({
      
      customerName,
      rating,
      reviewText
    });

    await newReview.save();
  
    res.status(201).json(newReview);
  });
  
  
module.exports = router;