require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});
app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "MongoDB is not connected. Check backend/.env and your database." });
  }
  next();
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/creators", require("./routes/creatorRoutes"));
app.use("/api/briefs", require("./routes/briefRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/", express.static(frontendPath));

app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
  if (error.code === 11000) return res.status(409).json({ message: "That record already exists." });
  const status = error.status || (mongoose.connection.readyState === 1 ? 500 : 503);
  res.status(status).json({ message: status === 500 ? "Something went wrong. Please try again." : error.message });
});

function start() {
  const server = app.listen(PORT, () => console.log(`AI CreatorHub is running at http://localhost:${PORT}`));
  connectDatabase().catch(error => {
    console.error(`MongoDB is not connected: ${error.message}`);
    console.error("The website will still load; data-backed API routes need MongoDB.");
  });
  return server;
}

if (require.main === module) start();
module.exports = app;
