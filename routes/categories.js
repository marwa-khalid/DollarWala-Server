const Category = require("../models/Categories");
const express = require("express");
const router = express.Router();
const Product = require('../models/Product');

router.post("/" , async (req,res)=>{
 
  try{
    const category = new Category(req.body);
    if(!category){
      console.log(category)
      return res.send({message:"Field is empty"});
      
    }
   await category.save();
   return res.status(200).json(category);
  }
  catch(error){
    return res.send({message:"Internal server error"});
  }
  }
); 

//GET All 

router.get("/", async (req,res)=>{
    try{
const categories = await Category.find();
res.status(200).json(categories);
    }catch(err){
        res.status(500).json(err);
    }
});


//Delete category

router.delete('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    console.log(category)
    try {
      // Find all products associated with the category
      const productsToDelete = await Product.find({ category: category.category });
      console.log(productsToDelete)
  
      // Delete all associated products
      productsToDelete.map(async (product) => {
        await Product.findByIdAndDelete(product._id);
      });
  
      // Now, delete the category
      await category.deleteOne();
  
      res.json({ message: 'Category and associated products deleted successfully' });
    } catch (error) {
      console.error('Error deleting category and associated products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 module.exports = router; 