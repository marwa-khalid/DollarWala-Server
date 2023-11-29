const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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

dotenv.config();

const DB = 'mongodb+srv://hamzarana:haider011@cluster0.4xnpcsg.mongodb.net/DollarWala';

app.use(cors());

mongoose.connect(DB,{}).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log("no connection"));

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/payments", paymentRoute)
app.use("/api/franchise",franchiseRoute);
app.use("/api/reset",resetRoute);
app.use("/api/contact",contactRoute);
app.use("/api/ShopReviews", shopReviewRoute);
app.use("/api/authenticate",authenticationRoute);

app.use(express.static("../client"));
app.use('/uploads', express.static('uploads'));

app.listen(5000, ()=>{
    console.log("backened is running");
});