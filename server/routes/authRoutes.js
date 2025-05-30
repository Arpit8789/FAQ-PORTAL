const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  loginUser,
  registerUser,
  getUserAnalytics,
  getMe,
  getBookmarks,
  addBookmark,
  removeBookmark
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/analytics", authMiddleware, roleMiddleware(["Admin"]), getUserAnalytics);
router.get("/me", authMiddleware, getMe);

// --- Bookmarks ---
router.get("/bookmarks", authMiddleware, getBookmarks);
router.post("/bookmarks", authMiddleware, addBookmark);
router.delete("/bookmarks/:faqId", authMiddleware, removeBookmark);

module.exports = router;
