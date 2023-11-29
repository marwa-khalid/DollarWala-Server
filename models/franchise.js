const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({

    name: {
        //properties
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    phoneNumber: {
      type: String,
      required: true,
    },
    preferredLocation: {
      type: String,
      required: true,
    }
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Franchise" , franchiseSchema);