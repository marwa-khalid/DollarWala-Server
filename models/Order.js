// order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 email: {
        type: String, // Change the type to String
        required: true,
      },
  products: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      image:{
        type: String,
        required: true,
      }
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
  },

  paymentMethod : {
    type: String,
  }
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
