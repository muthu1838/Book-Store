const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


router.get("/", async (req, res) => {
  const books = await Book.find({ featured: true });
  res.json(books);
});


router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

module.exports = router;
