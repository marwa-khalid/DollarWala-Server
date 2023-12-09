const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

  router.post("/", async (req, res)=>{
    try{
        const product =  req.body.product;
        const productId =  product._id;
        const userId = req.body.userId;
        
        const existingWishlistItem = await Wishlist.findOne({ userId, productId });

        if (existingWishlistItem) {
          await Wishlist.deleteOne(existingWishlistItem);
          return res.status(200).json({ message: 'Product deleted from wishlist' });
        }

        const wishlistItem = new Wishlist({
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
          userId: userId,
          productId:productId
        });


  
        await wishlistItem.save();

        return res.status(200).json({ message: "Product added to wishlist." });
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        return res.status(500).json({ message: "Error adding to wishlist", error: error.message });
      }
    });

  router.get("/:id", async (req, res)=>{
    const userId = req.params.id;
    try{
        const product =  await Wishlist.find({userId : userId})
        res.status(200).json(product);
    }
    catch(err){
      res.status(500).json(err)  
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      
      const productId = req.params.id;
  
      // Find and remove the product from the wishlist
      await Wishlist.findByIdAndDelete(productId);
  
      return res.status(200).json({ message: "Product removed from the wishlist" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

module.exports = router;
