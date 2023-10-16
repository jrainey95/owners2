const mongoose = require("mongoose");

const horseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    
  },
  gender: {
    type: String,
    
  },
  sire: {
    type: String,
  },
  dam: {
    type: String,
  },
  trainer: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Horse = mongoose.model("Horse", horseSchema);

module.exports = Horse;
