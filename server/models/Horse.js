const mongoose = require("mongoose");

const horseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Colt", "Filly", "Gelding", "Horse", "Mare", "mare"],
    required: true,
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
