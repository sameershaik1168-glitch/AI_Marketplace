const router = require("express").Router();
const { listBriefs, createBrief } = require("../controllers/briefController");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", requireAuth, listBriefs);
router.post("/", requireAuth, requireRole("brand"), createBrief);
module.exports = router;
