const express = require("express");
const Restaurant = require("../models/Restaurant");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, admin, async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
