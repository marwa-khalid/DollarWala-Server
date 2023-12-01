const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true 
        
    },

    cartItems: [
        {
            productId:{
                type:String
            },
            quantity:{
                type: Number,
                default: 1,
            },
            title:{
                type:String
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
    ],

 

    
},
{ timestamps: true}

);

module.exports = mongoose.model("Cart" , CartSchema);