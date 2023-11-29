//handle only one record
//schema for database

const mongoose = require("mongoose");

const resetDetail = new mongoose.Schema({
  email: {
    //properties
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  }
});

//export schema
module.exports = mongoose.model("Reset", resetDetail);
