const mongoose = require("mongoose");


const WishlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true 
    },
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
         required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

},
{ timestamps: true}

);

module.exports = mongoose.model("Wishlist" , WishlistSchema);