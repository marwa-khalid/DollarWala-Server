const Order = require("../models/Order");

const express = require("express");
const router = express.Router();

router.post("/" , async (req,res)=>{
  console.log("helo")
  const newOrder = new Order(req.body);
  console.log("helo1")
  try{
    console.log("helo2")
   const savedOrder = await newOrder.save();
   console.log("helo3")
   res.status(200).json(savedOrder);
  }catch(err){
     res.status(500).json(err)
     console.log("helo4")
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

router.get("/",  async (req,res)=>{
    try{
const orders = await Order.find();
res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

 module.exports = router; 