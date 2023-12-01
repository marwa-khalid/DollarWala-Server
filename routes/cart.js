const Cart = require("../models/Cart");
const router = require("express").Router();

// Create a new cart
router.post('/', async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an existing cart by ID
router.post('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id",  async (req,res)=>{
    try{
       
       const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
        $set: req.body
       },
       {new:true}
       );
    
       res.status(200).json(updatedCart);
    }catch(err){
      
        res.status(500).json(err);
    }
    
});

//Delete 

router.delete("/:id", async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted..")
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET user cart

router.get("/find/:userId", async (req, res)=>{
    try{
        const cart =  await Cart.findOne({ userId: req.params.userId});
         res.status(200).json(cart);
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET All 

router.get("/", async (req,res)=>{
    try{
const carts = await Cart.find();
res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});



 module.exports = router;