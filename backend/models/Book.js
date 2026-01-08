const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  featured: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
