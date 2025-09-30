const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");
const ApiResponse = require("../utils/ApiResponse");

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res
        .json(new ApiResponse(400, null, "Please provide name, email and password"));
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .json(new ApiResponse(409, null, "Email already registered"));
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    // Generate token
    const token = jwt.sign(
      {
        sub: user._id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res
      .json(
        new ApiResponse(
          201,
          {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          },
          "User registered successfully"
        )
      );
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .json(new ApiResponse(500, null, "Error registering user"));
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res
        .json(new ApiResponse(400, null, "Please provide email and password"));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .json(new ApiResponse(401, null, "Invalid credentials"));
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .json(new ApiResponse(401, null, "Invalid credentials"));
    }

    // Generate token
    const token = jwt.sign(
      {
        sub: user._id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res
      .json(
        new ApiResponse(
          200,
          {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          },
          "Login successful"
        )
      );
  } catch (err) {
    console.error("Login error:", err);
    return res
      .json(new ApiResponse(500, null, "Error logging in"));
  }
};
