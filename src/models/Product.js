// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price:Number
  // Other fields
});

module.exports = mongoose.model("Product", productSchema);
