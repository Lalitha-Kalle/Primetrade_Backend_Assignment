const Task = require("../models/Task");
const ApiResponse = require("../utils/ApiResponse");

// Create task (any user)
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    console.log(req.user.sub)

    const task = await Task.create({
      title,
      description,
      status: status ,
      createdBy: req.user.sub,  // logged-in user
    });

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Error creating task"));
  }
};

// Get all tasks (admin only)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");
    res.json(new ApiResponse(200, tasks, "All tasks fetched successfully"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Error fetching tasks"));
  }
};

// Get task by ID (admin or owner)
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }

    if (req.user.role !== "admin" && task.createdBy._id.toString() !== req.user.sub) {
      return res.status(403).json(new ApiResponse(403, null, "Forbidden"));
    }

    res.json(new ApiResponse(200, task, "Task fetched successfully"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Error fetching task"));
  }
};

// Update task (admin or owner)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }

    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.sub) {
      return res.status(403).json(new ApiResponse(403, null, "Forbidden"));
    }

    task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json(new ApiResponse(200, task, "Task updated successfully"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Error updating task"));
  }
};

// Delete task (admin only)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }

    res.json(new ApiResponse(200, null, "Task deleted successfully"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Error deleting task"));
  }
};
