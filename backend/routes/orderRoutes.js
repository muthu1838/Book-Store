const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/checkout", async (req, res) => {
  try {
    const { items, totalAmount, customer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      items,
      totalAmount,
      customer
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router;
