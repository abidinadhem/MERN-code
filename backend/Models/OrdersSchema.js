const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  totalPrice: Number,
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity : Number,
      price : Number
    },
  ],
});

module.exports = mongoose.model("order", ProductSchema);
