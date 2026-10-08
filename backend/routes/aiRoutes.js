const router = require("express").Router();
const { rateLimit } = require("express-rate-limit");
const { generateContent } = require("../controllers/aiController");
const { requireAuth } = require("../middleware/auth");

const aiLimit = rateLimit({ windowMs: 60 * 60 * 1000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false });
router.post("/generate", requireAuth, aiLimit, generateContent);
module.exports = router;
