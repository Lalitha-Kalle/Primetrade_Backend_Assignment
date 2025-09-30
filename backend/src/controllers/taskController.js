const Task = require("../models/Task");
const ApiResponse = require("../utils/ApiResponse");

// Create task (any user)

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Enhanced validation
    if (!title || title.trim().length < 3) {
      return res.status(400).json(
        new ApiResponse(400, null, "Title is required and must be at least 3 characters")
      );
    }

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json(
        new ApiResponse(400, null, "Invalid status value")
      );
    }

    // Create task with user ID from auth middleware
    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      createdBy: req.user.id  // Using id from auth middleware
    });

    // Populate creator details
    await task.populate('createdBy', 'name email');

    return res.status(201).json(
      new ApiResponse(201, task, "Task created successfully")
    );

  } catch (err) {
    console.error('Task creation error:', err);
    return res.status(500).json(
      new ApiResponse(500, null, err.message || "Error creating task")
    );
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
    const { title, description, status } = req.body;

    // Find task and check ownership
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(
        new ApiResponse(404, null, "Task not found")
      );
    }

    // Allow update if admin or task owner
    if (!req.user.role === 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json(
        new ApiResponse(403, null, "Not authorized to update this task")
      );
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json(
          new ApiResponse(400, null, "Invalid status value")
        );
      }
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }),
        ...(status && { status })
      },
      { 
        new: true,
        runValidators: true 
      }
    ).populate('createdBy', 'name email');

    return res.status(200).json(
      new ApiResponse(200, updatedTask, "Task updated successfully")
    );

  } catch (err) {
    console.error('Task update error:', err);
    return res.status(500).json(
      new ApiResponse(500, null, err.message || "Error updating task")
    );
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
