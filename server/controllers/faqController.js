const Faq = require("../models/Faq");


exports.getAllFaqs = async (req, res) => {
  try {
    const search = req.query.search;
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const faqs = await Faq.find(filter).sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQs" });
  }
};




exports.createFaq = async (req, res) => {
  const { title, category, description, tags } = req.body;
  try {
    const newFaq = new Faq({
      title,
      category,
      description,
      tags,
      createdBy: req.user.id
    });
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (err) {
    res.status(500).json({ message: "Failed to create FAQ" });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const updated = await Faq.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};



// controllers/faqController.js
// controllers/faqController.js
exports.getFaqAnalytics = async (req, res) => {
  try {
    const totalFaqs = await Faq.countDocuments();
    const faqs = await Faq.find();

    // Group by category
    const faqsByCategory = faqs.reduce((acc, faq) => {
      acc[faq.category] = (acc[faq.category] || 0) + 1;
      return acc;
    }, {});
    const faqsByCategoryArr = Object.entries(faqsByCategory).map(([category, count]) => ({ category, count }));

    // Top tags
    const tagCounts = {};
    faqs.forEach(faq => {
      (faq.tags || []).forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    // Most viewed (if you track views), else just empty array
    const mostViewedFaqs = []; // Only implement if you have a 'views' field

    // Recent FAQs (always safe)
    const recentFaqs = await Faq.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalFaqs,
      faqsByCategory: faqsByCategoryArr,
      topTags,
      mostViewedFaqs,
      recentFaqs,
    });
  } catch (err) {
    console.error("Analytics error:", err); // LOGS the real error to your backend console
    res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
  }
};


// New: Get FAQ by ID
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQ" });
  }
};
