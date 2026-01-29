const express = require("express");
const Food = require("../models/Food");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/:restaurantId", async (req, res, next) => {
  try {
    const foods = await Food.find({
      restaurantId: req.params.restaurantId
    });
    res.json(foods);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, admin, async (req, res, next) => {
  try {
    const food = await Food.create(req.body);
    res.json(food);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
