const router = require("express").Router();
const { listProjects, createProject, updateProject } = require("../controllers/projectController");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", requireAuth, listProjects);
router.post("/", requireAuth, requireRole("brand"), createProject);
router.patch("/:id", requireAuth, requireRole("creator"), updateProject);
module.exports = router;
