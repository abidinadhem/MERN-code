const exprees = require("express");

const {
getProductById,
getProducts,
addProduct,
getAllProducts,
deleteProduct,
editProduct
} = require("../Controller/productController");
const { isAthentificated } = require("../MiddleWares/isAthentificated");

const appRouter = exprees.Router();
// Add User object to the database
appRouter.post("/",isAthentificated, addProduct);
// Get Array of Users objects from the database
appRouter.get("/", getProducts);
appRouter.get("/all", getAllProducts);
// Get  Users object by ID from the database
appRouter.get("/:id", isAthentificated, getProductById);
appRouter.put("/:id", isAthentificated, editProduct);
appRouter.delete("/:id", isAthentificated, deleteProduct);


module.exports = appRouter;
