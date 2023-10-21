const { Schema } = require('mongoose');

const horseSchema = new Schema({
  horseId: {
    type: String, 
    required: true,
  },
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

module.exports = horseSchema;
