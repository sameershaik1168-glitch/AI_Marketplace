const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : null;
    if (!token) return res.status(401).json({ message: "Sign in to continue." });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.sub).select("-passwordHash");
    if (!req.user) return res.status(401).json({ message: "Account not found." });
    next();
  } catch {
    res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "This action is not available for your account." });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
