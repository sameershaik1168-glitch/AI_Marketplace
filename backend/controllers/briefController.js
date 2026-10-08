const Brief = require("../models/Brief");

async function listBriefs(req, res, next) {
  try {
    const query = req.user.role === "brand" ? { brand: req.user._id } : { status: "open" };
    const briefs = await Brief.find(query).sort({ createdAt: -1 }).populate("brand", "name company");
    res.json(briefs);
  } catch (error) { next(error); }
}

async function createBrief(req, res, next) {
  try {
    const { title, category, description, deliverables, budget, deadline, platform } = req.body;
    if (!title || !category || !description) return res.status(400).json({ message: "Title, category, and description are required." });
    const brief = await Brief.create({
      brand: req.user._id, title, category, description,
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      budget: budget === "" || budget == null ? undefined : Number(budget),
      deadline: deadline || undefined, platform
    });
    res.status(201).json(brief);
  } catch (error) { next(error); }
}

module.exports = { listBriefs, createBrief };
