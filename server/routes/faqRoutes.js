const express = require("express");
const router = express.Router();
const {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getFaqById,
  getFaqAnalytics
} = require("../controllers/faqController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Public: View and Search FAQs
router.get("/analytics", authMiddleware, roleMiddleware(["Admin"]), getFaqAnalytics);
router.get("/", getAllFaqs);
router.get("/:id", getFaqById);

// Protected routes - Admin only

router.post("/", authMiddleware, roleMiddleware(["Admin"]), createFaq);

router.put("/:id", authMiddleware, roleMiddleware(["Admin"]), updateFaq);
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deleteFaq);


module.exports = router;
