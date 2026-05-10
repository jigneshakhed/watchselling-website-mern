const router = require('express').Router();
const Payment = require('../models/Payment');
const { verifyTokenAndAdmin } = require('../middleware/auth');

// GET ALL PAYMENTS (Admin only)
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('userId', 'username')
            .populate('orderId')
            .sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
