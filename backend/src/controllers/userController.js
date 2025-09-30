const User = require("../models/User");
const ApiResponse = require("../utils/ApiResponse");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); // hide passwords
    res.json(new ApiResponse(200, users, "All users fetched successfully"));
  } catch (err) {
    res.json(new ApiResponse(500, null, "Error fetching users"));
  }
};

// Get single user (admin or self)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // If role is user, only allow access to own profile
    if (req.user.role === "user" && req.user.sub !== id) {
      return res.json(new ApiResponse(403, null, "Forbidden"));
    }

    const user = await User.findById(id).select("-passwordHash");
    if (!user) {
      return res.json(new ApiResponse(404, null, "User not found"));
    }

    res.json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (err) {
    res.json(new ApiResponse(500, null, "Error fetching user"));
  }
};

// Update user (admin or self)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === "user" && req.user.sub !== id) {
      return res.json(new ApiResponse(403, null, "Forbidden"));
    }

    const updates = req.body;
    delete updates.password; // don’t allow password changes here

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!user) {
      return res.json(new ApiResponse(404, null, "User not found"));
    }

    res.json(new ApiResponse(200, user, "User updated successfully"));
  } catch (err) {
    res.json(new ApiResponse(500, null, "Error updating user"));
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res.json(new ApiResponse(403, null, "Forbidden"));
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.json(new ApiResponse(404, null, "User not found"));
    }

    res.json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (err) {
    res.json(new ApiResponse(500, null, "Error deleting user"));
  }
};
