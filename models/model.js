const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  productId: {
    require: true,
    type: Number
  },
  quantity: {
    require: true,
    type: Number
  }
  ,
  operation: {
    require: true,
    type: String
  }
})
  

const model = mongoose.model('Data', dataSchema);
module.exports = model;