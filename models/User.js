const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
        //properties
        type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status:{
      type:String // pending, active, rejected
    },
    image:{
      type:String,
      required: true,
    },
    verificationCode: {
      type: String,
    },
    // verified: {
    //   type: Boolean,
    // },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
