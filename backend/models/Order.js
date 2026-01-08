const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  customer: {
    name: String,
    email: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
