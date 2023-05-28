const exprees = require("express");

const {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  register,
  login,
  editUser,
} = require("../Controller/userController");
const { isAthentificated } = require("../MiddleWares/isAthentificated");

const appRouter = exprees.Router();
// Add User object to the database
appRouter.post("/",isAthentificated, addUser);
// Get Array of Users objects from the database
appRouter.get("/", getUsers);
// Get  Users object by ID from the database
appRouter.get("/:id", getUserById);
appRouter.put("/:id", isAthentificated, editUser);
appRouter.delete("/:id", isAthentificated, deleteUser);
appRouter.post("/register", register);
appRouter.post("/login", login);

module.exports = appRouter;
