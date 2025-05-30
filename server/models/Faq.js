const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [String],
  createdBy: {
    type: String,
    default: "Anonymous"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model("Faq", FaqSchema);
