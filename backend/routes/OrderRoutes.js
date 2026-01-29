const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.foodId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
