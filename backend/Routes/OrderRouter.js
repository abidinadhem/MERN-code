const exprees = require("express");

const {
  addOrder,getOrders
} = require("../Controller/orderController");
const { isAthentificated } = require("../MiddleWares/isAthentificated");

const appRouter = exprees.Router();
// Add User object to the database
appRouter.post("/", addOrder);
// Get Array of Users objects from the database
appRouter.get("/", isAthentificated, getOrders);

module.exports = appRouter;
