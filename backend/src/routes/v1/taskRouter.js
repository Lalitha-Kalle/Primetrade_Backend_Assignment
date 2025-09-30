const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorize = require("../../middlewares/authorise");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
} = require("../../controllers/taskController");

const router = express.Router();

//  Create task (any logged-in user)
router.post("/", authenticate, createTask);

//  Get all tasks (admin or owner only)
router.get("/", authenticate, authorize([ "user", "admin"]), getTasks);

//  Get single task (admin or owner only)
router.get("/:id", authenticate, authorize(["user", "admin"]), getTaskById);

//  Update task (admin or owner only)
router.put("/:id", authenticate, authorize(["user", "admin"]), updateTask);

//  Delete task (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), deleteTask);



module.exports = router;
