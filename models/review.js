const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    
  customerName:{
    type: String,
  },
  productId:{
    type: String,
    required:true
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

module.exports = mongoose.model("Review", reviewSchema);
