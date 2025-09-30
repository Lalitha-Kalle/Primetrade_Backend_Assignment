const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorize = require("../../middlewares/authorise");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

const router = express.Router();

//  Admin only: get all users
router.get("/", authenticate, authorize(["admin"]), getAllUsers);

//  Admin or self: get single user
router.get("/:id", authenticate, authorize(["admin", "user"]), getUserById);

//  Admin or self: update user
router.put("/:id", authenticate, authorize(["admin", "user"]), updateUser);

//  Admin only: delete user
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

module.exports = router;
