const router = require("express").Router();
const Contact = require("../models/Contact");
const { verifyTokenAndAdmin } = require("../middleware/auth");

// CREATE CONTACT MESSAGE
router.post("/", async (req, res) => {
    const newContact = new Contact(req.body);
    try {
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL CONTACT MESSAGES (ADMIN ONLY)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE CONTACT MESSAGE (ADMIN ONLY)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json("Message has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
