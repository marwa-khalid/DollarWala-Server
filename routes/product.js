const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const multer = require('multer');
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage: storage });

  router.post('/', upload.single('image'), async (req, res) => {
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const { title, price, description,quantity, category } = req.body;
    const image = 'uploads/' + req.file.filename;
  
    const product = new Product({
        title,
        price,
        description,
        quantity,
        image,
        category
      });

      await product.save();

    // Respond with a success message or error as needed
    res.status(200).send('Product saved successfully.');
  });

  
  router.put("/:id", upload.single('image'), async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(req.params);
      console.log(req.body)
      let { title, price, description, image, quantity, category } = req.body;
      const product = await Product.findById(productId);
      console.log(req.file)
      if (req.file) {
        // If a new image is provided, update the image path
        image = 'uploads/' + req.file.filename;
      }
      console.log("tes")
      // Find the existing product by ID
  
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      product.title = title;
      product.price = price;
      product.description = description;
      console.log("test")
      if (image) {
        product.image = image;
      }
      console.log("test1")
      product.quantity = quantity;
      product.category = category;
      
      console.log("testbefor")
      // Save the updated product
      await product.save();
      console.log("testafter")
  
      return res.send({ message: "Product updated successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Failed to update product" });
    }
  }); 

//Delete 

router.delete("/:id",  async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been delted..")
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET Product

router.get("/:id", async (req, res)=>{
    try{
        const product =  await Product.findById(req.params.id)
         res.status(200).json(product);
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET All 

router.get("/", async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
       let products;

       if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(1)

       }else if(qCategory){
        products = await Product.find({categories:{
            $in: [qCategory],
        },
    });
       }else{
        products = await Product.find();
       }
        res.status(200).json(products);
    }catch(err){
       res.status(500).json(err)  
    }
});



 module.exports = router;