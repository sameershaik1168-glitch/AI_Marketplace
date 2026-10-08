const router = require("express").Router();
const { listCreators, getCreator, getMyProfile, updateMyProfile } = require("../controllers/creatorController");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", listCreators);
router.get("/me", requireAuth, requireRole("creator"), getMyProfile);
router.get("/:id", getCreator);
router.put("/me", requireAuth, requireRole("creator"), updateMyProfile);
module.exports = router;
