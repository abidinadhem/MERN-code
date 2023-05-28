const OrdersSchema = require("../Models/OrdersSchema");
const mongoose = require("mongoose");

exports.getAllOrders = async (req, res) => {
  try {
    OrdersSchema
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

exports.getOrders = async (req, res) => {
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
    OrdersSchema
    .find({...filters})
    .skip(skip)
    .populate('items.product')
    .limit(PAGE_SIZE)
    .exec()
    .then(async (data) => {
      const count = await OrdersSchema.countDocuments();
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

exports.addOrder= async (req, res) => {
  try {
    console.log(req.body)
    const newOrder= await new OrdersSchema(req.body);
    newOrder.save();
    res.status(200).send("added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went Wrong ⛔");
  }
};
