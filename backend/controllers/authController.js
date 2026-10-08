const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Creator = require("../models/Creator");

function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, company: user.company };
}

async function register(req, res, next) {
  try {
    const { name, email, password, role, company } = req.body;
    if (!name || !email || !password || !["brand", "creator"].includes(role)) {
      return res.status(400).json({ message: "Name, email, password, and account type are required." });
    }
    if (password.length < 8) return res.status(400).json({ message: "Use a password with at least 8 characters." });
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ message: "An account with that email already exists." });

    const user = await User.create({
      name: name.trim(), email: normalizedEmail, role,
      company: role === "brand" ? String(company || "").trim() : undefined,
      passwordHash: await bcrypt.hash(password, 12)
    });
    if (role === "creator") await Creator.create({ user: user._id, name: user.name });
    res.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) { next(error); }
}

async function login(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(String(req.body.password || ""), user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) { next(error); }
}

module.exports = { register, login };
