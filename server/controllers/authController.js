const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Faq = require("../models/Faq"); // Add this if not already

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ username, email, password, role });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Analytics (Admin only)
exports.getUserAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find();
    const usersByRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    res.json({ totalUsers, usersByRole });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Current logged in user
exports.getMe = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });

    // Populate bookmarks with FAQ info
    const user = await User.findById(req.user._id).populate("bookmarks");
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      bookmarks: user.bookmarks, // <-- include bookmarks
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Bookmarks ---

// Get all bookmarks for user
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookmarks");
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookmarks" });
  }
};

// Add a bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { faqId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user.bookmarks.includes(faqId)) {
      user.bookmarks.push(faqId);
      await user.save();
    }
    res.json({ message: "Bookmarked!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to bookmark FAQ" });
  }
};

// Remove a bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { faqId } = req.params;
    const user = await User.findById(req.user._id);
    user.bookmarks = user.bookmarks.filter(
      (id) => id.toString() !== faqId
    );
    await user.save();
    res.json({ message: "Bookmark removed!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove bookmark" });
  }
};
