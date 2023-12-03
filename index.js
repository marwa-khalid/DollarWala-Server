const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = express.Router();

const port = process.env.PORT || 5000;

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const reviewRoute = require("./routes/reviews");
const paymentRoute = require("./routes/payment");
const franchiseRoute = require("./routes/franchise");
const resetRoute = require("./routes/reset");
const contactRoute = require("./routes/contact");
const shopReviewRoute = require("./routes/ShopReviews");
const authenticationRoute = require("./routes/authenticate");
const categoryRoute = require("./routes/categories");
const wishlistRoute = require("./routes/wishlist");

dotenv.config();

const DB = 'mongodb+srv://hamzarana:haider011@cluster0.4xnpcsg.mongodb.net/DollarWala';

app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(DB,{}).then(()=>{
    console.log("connection successful with db");
}).catch((err)=>console.log("no connection"));


router.get('/', (req,res)=>{
    res.send("Welcome to DollarWala Server!");
})
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/",router);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/payments", paymentRoute)
app.use("/api/franchise",franchiseRoute);
app.use("/api/reset",resetRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/contact",contactRoute);
app.use("/api/ShopReviews", shopReviewRoute);
app.use("/api/authenticate",authenticationRoute);
app.use("/api/wishlist", wishlistRoute);

app.use(express.static("../client"));
app.use('/uploads', express.static('uploads'));

app.listen(port, ()=>{
    console.log(`Server running at port numnber ${port}`);
});