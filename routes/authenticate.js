const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) => {
  const {email} = req.body;
    
  const token = Math.floor(1000 + Math.random() * 9999);
    const tokenExpiration = Date.now() + 3600000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dollarwalafyp@gmail.com",
        pass: "pofu vgus dyoe ocoh",
      },
    });
    console.log("working")
    const mailOptions = {
      from: "dollarwalafyp@gmail.com",
      to: email,
      subject: "Verification code for registration",
      html: `<p>You have requested to register on DollarWala. Here is your verification code.</p>
      <a href="${token}">${token}</a>`
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).json({ success:false, message: "Email could not be sent. Please try again later." });
      } else {
        console.log("ok")
        res.json({ success:true ,message: "Email sent successfully.",token:{token:token,tokenExpiration:tokenExpiration} });
        console.log("ok")
      }
    });
  }
);

router.post("/confirm", async(req, res) => {
  try{
    console.log("confirmroute");
    const {token,verificationCode,expirationDate} = req.body;
    
    if(token != verificationCode){
      return res.status(400).send({success:false, message:"Code is wrong"});
    }
    if(expirationDate < new Date()){
      return res.status(400).send({success:false, message:"Token has expired"});
    }
    
    return res.status(200).json({ message: "User Verified" });
  }
  catch(err){
    return res.status(500).send({success:false, message:"error"})
  }
});

module.exports = router;