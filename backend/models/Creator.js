const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, default: "AI Content", trim: true },
  bio: { type: String, default: "", maxlength: 1200 },
  avatar: { type: String, default: "" },
  location: { type: String, default: "Remote" },
  skills: [{ type: String, trim: true }],
  tools: [{ type: String, trim: true }],
  services: [{ title: String, description: String, price: { type: Number, min: 0 } }],
  portfolio: [{ title: String, description: String, image: String, url: String }],
  reviews: [{ author: String, rating: { type: Number, min: 1, max: 5 }, comment: String, date: Date }],
  rating: { type: Number, default: 5, min: 0, max: 5 },
  projectCount: { type: Number, default: 0, min: 0 },
  startingPrice: { type: Number, default: 100, min: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Creator", creatorSchema);
