const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cuisine: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    rating: {
      type: Number,
      default: 4
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
