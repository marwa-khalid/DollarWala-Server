const Order = require("../models/Order");
const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

router.post("/" , async (req,res)=>{
 
  const newOrder = new Order(req.body);
  for(const prodItem of req.body.products)
  {
   const product = await Product.findById(prodItem.productId);
   product.quantity -= prodItem.quantity;
   await product.save();
  }
  try{
    
   const savedOrder = await newOrder.save();
   
   res.status(200).json(savedOrder);
  }catch(err){
     res.status(500).json(err)
     
  }
}); 

//update order status
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    if(req.body.status === "cancelled")
    {
      for(const prodItem of order.products)

      {
       const product = await Product.findById(prodItem.productId);
       product.quantity += prodItem.quantity;
       await product.save();
      }
    }
    await order.save();
  }
  catch (error) {
    return res.status(404).json(error);
  }
});

//Delete 

router.delete("/:id", async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been delted..")
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET user orders

router.get('/', async (req, res) => {
  try {
    const userEmail = req.query.email; // Assuming you're passing the email as a query parameter

    const userOrders = await Order.find({ email: userEmail });

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

router.get('/all', async (req, res) => {
  try {

    const userOrders = await Order.find();

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


//GET All 

router.get("/", async (req,res)=>{
    try{
const orders = await Order.find();
res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

 module.exports = router; 