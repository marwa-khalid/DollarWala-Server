const Order = require("../models/Order");
const { verifyToken, verifyTokenAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

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

//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
       
       const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set: req.body
       },
       {new:true}
       );
    
       res.status(200).json(updatedOrder);
    }catch(err){
      
        res.status(500).json(err);
    }
    
});

//Delete 

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
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

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
const orders = await Order.find();
res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//Get Monthly Income

router.get("/income", verifyTokenAndAdmin, async (req,res)=>{
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth()-1));
   const previousMonth = new Date(new date.setMonth(lastMonth.getMonth() - 1)); 

   try{
     const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth} } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount" 
            },
        },
            {
               $group: {
                _id: "$month",
                total: { $sum: "$sales"}, 
               },
            },
        
     ]);
     res.status(200).json(income);
   } catch(err){
    res.status(500).json(err)
   }
});

 module.exports = router; 