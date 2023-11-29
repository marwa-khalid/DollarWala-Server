const mongoose = require("mongoose");

const ShopReviewsSchema = new mongoose.Schema({
    
  customerName:{
    type: String,
  },
    
  rating: {
    type: Number,
    required: true,
    minimum: 0,
    maximum: 5
  },
  reviewText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ShopReviews", ShopReviewsSchema);
