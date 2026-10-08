const mongoose = require("mongoose");

const briefSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true },
  description: { type: String, required: true, maxlength: 3000 },
  deliverables: [{ type: String, trim: true }],
  budget: { type: Number, min: 0 },
  deadline: Date,
  platform: String,
  status: { type: String, enum: ["open", "in_progress", "completed", "cancelled"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Brief", briefSchema);
