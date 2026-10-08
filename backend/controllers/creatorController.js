const Creator = require("../models/Creator");
const User = require("../models/User");

async function listCreators(req, res, next) {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.tool) query.tools = req.query.tool;
    if (req.query.skill) query.skills = new RegExp(String(req.query.skill).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    if (req.query.maxPrice) query.startingPrice = { $lte: Number(req.query.maxPrice) };
    if (req.query.minRating) query.rating = { $gte: Number(req.query.minRating) };
    if (req.query.search) query.$or = [
      { name: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
      { bio: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
      { skills: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }
    ];
    const creators = await Creator.find(query).sort({ featured: -1, rating: -1 }).limit(60).populate("user", "name");
    res.json(creators);
  } catch (error) { next(error); }
}

async function getCreator(req, res, next) {
  try {
    const creator = await Creator.findById(req.params.id).populate("user", "name");
    if (!creator) return res.status(404).json({ message: "Creator not found." });
    res.json(creator);
  } catch (error) { next(error); }
}

async function getMyProfile(req, res, next) {
  try {
    const creator = await Creator.findOne({ user: req.user._id });
    if (!creator) return res.status(404).json({ message: "Creator profile not found." });
    res.json(creator);
  } catch (error) { next(error); }
}

async function updateMyProfile(req, res, next) {
  try {
    const allowed = ["name", "category", "bio", "avatar", "location", "skills", "tools", "services", "portfolio", "startingPrice"];
    const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const creator = await Creator.findOneAndUpdate({ user: req.user._id }, { $set: changes }, { new: true, runValidators: true });
    if (!creator) return res.status(404).json({ message: "Creator profile not found." });
    if (changes.name) await User.findByIdAndUpdate(req.user._id, { name: changes.name });
    res.json(creator);
  } catch (error) { next(error); }
}

module.exports = { listCreators, getCreator, getMyProfile, updateMyProfile };
