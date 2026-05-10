const router = require("express").Router();
const Review = require("../models/Review");

// CREATE REVIEW
router.post("/", async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL REVIEWS
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
