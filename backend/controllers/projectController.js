const Project = require("../models/Project");
const Creator = require("../models/Creator");
const Brief = require("../models/Brief");

async function listProjects(req, res, next) {
  try {
    const query = req.user.role === "brand" ? { brand: req.user._id } : { creator: req.user._id };
    const projects = await Project.find(query).sort({ updatedAt: -1 })
      .populate("brand", "name company")
      .populate("creator", "name")
      .populate("brief");
    res.json(projects);
  } catch (error) { next(error); }
}

async function createProject(req, res, next) {
  try {
    const { creatorId, briefId, title, message, budget, dueDate } = req.body;
    if (!creatorId || !title) return res.status(400).json({ message: "Choose a creator and add a project title." });
    const creatorProfile = await Creator.findById(creatorId);
    if (!creatorProfile?.user) return res.status(404).json({ message: "Creator profile not found." });
    if (creatorProfile.user.toString() === req.user._id.toString()) return res.status(400).json({ message: "You cannot request your own profile." });
    let brief;
    if (briefId) {
      brief = await Brief.findOne({ _id: briefId, brand: req.user._id });
      if (!brief) return res.status(404).json({ message: "Brief not found." });
    }
    const project = await Project.create({
      brand: req.user._id, creator: creatorProfile.user, creatorProfile: creatorProfile._id,
      brief: brief?._id, title, message, budget: budget === "" || budget == null ? undefined : Number(budget), dueDate
    });
    res.status(201).json(project);
  } catch (error) { next(error); }
}

async function updateProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    if (project.creator.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Only the assigned creator can update this request." });
    const allowedStatuses = project.status === "pending"
      ? ["accepted", "rejected"]
      : project.status === "accepted" || project.status === "in_progress"
        ? ["in_progress", "completed"] : [];
    if (!allowedStatuses.includes(req.body.status)) return res.status(400).json({ message: "That status change is not allowed." });
    project.status = req.body.status;
    await project.save();
    if (project.status === "completed" && project.creatorProfile) {
      await Creator.findByIdAndUpdate(project.creatorProfile, { $inc: { projectCount: 1 } });
    }
    res.json(project);
  } catch (error) { next(error); }
}

module.exports = { listProjects, createProject, updateProject };
