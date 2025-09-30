const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT auth error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
