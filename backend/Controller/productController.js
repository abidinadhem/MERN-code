const ProductSchema = require("../Models/ProductSchema");
const mongoose = require("mongoose");


exports.getProducts = async (req, res) => {
  try {
    const PAGE_SIZE = 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * PAGE_SIZE;
    delete req.query.page
    const filters = Object.keys(req.query).reduce((memo,elem) =>{
      memo = {
        [elem]:elem !== 'user' ? new RegExp(req.query[elem], 'i') : req.query[elem]
      }
      return memo
    },{})
    ProductSchema
    .find({...filters})
    .skip(skip)
    .limit(PAGE_SIZE)
    .exec()
    .then(async (data) => {
      const count = await ProductSchema.countDocuments();
      const totalPages = Math.ceil(count / PAGE_SIZE);
      res.json({
        data,
        page: Number(page),
        totalPages,
      });

    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Somethig went wrong ⛔");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    ProductSchema
    .find()
    .populate('user')
    .exec()
    .then(async (data) => {
      res.json({
        data,
      });

    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Somethig went wrong ⛔");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductSchema.findById(id);

    product
      ? res.status(200).send(product)
      : res.status(400).send("cannot find product ⚠️");
  } catch (error) {
    console.log(error);
    res.status(500).send("cannot get ");
  }
};

exports.addProduct = async (req, res) => {
  try {
    const prod = req.body;
    const newProduct= await new ProductSchema(prod);
    newProduct.save();
    res.status(200).send("added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went Wrong ⛔");
  }
};

exports.editProduct= async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = req.body;

    await ProductSchema.findByIdAndUpdate({_id : id},newProduct );

    res.status(200).send("Product has been edited ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot edit ");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductSchema.findByIdAndRemove(id);
    res.status(200).send("Product has been deleted ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot delete product ");
  }
};
