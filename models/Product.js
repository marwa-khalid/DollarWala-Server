const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true 
        
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
        
    },

},
{ timestamps: true}

);

module.exports = mongoose.model("Product" , ProductSchema);