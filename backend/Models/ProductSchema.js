const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: String, 
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    price: Number,
    quantity: Number,
    description: String
})

module.exports = mongoose.model("product",ProductSchema)