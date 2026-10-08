const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  brief: { type: mongoose.Schema.Types.ObjectId, ref: "Brief" },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creatorProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" },
  title: { type: String, required: true, trim: true, maxlength: 140 },
  message: { type: String, default: "", maxlength: 2000 },
  budget: { type: Number, min: 0 },
  status: { type: String, enum: ["pending", "accepted", "rejected", "in_progress", "completed"], default: "pending" },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
