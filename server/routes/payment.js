const router = require('express').Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { verifyToken } = require('../middleware/auth');

router.post('/orders', verifyToken, async (req, res) => {
    try {
        if (process.env.RAZORPAY_KEY_ID === "YOUR_RAZORPAY_KEY_ID_HERE" || !process.env.RAZORPAY_KEY_ID) {
            console.log("RAZORPAY KEYS MISSING - RUNNING IN MOCK MODE");
            return res.status(200).json({ 
                data: { id: "order_mock_" + crypto.randomBytes(5).toString("hex"), amount: req.body.amount * 100, currency: "INR" },
                isMock: true
            });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error("RAZORPAY SDK ERROR:", error);
                return res.status(500).json({ message: "Razorpay Error", detail: error });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error("PAYMENT ROUTE CATCH ERROR:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.post('/verify', verifyToken, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (razorpay_order_id.startsWith("order_mock_")) {
            return res.status(200).json({ message: "Payment verified successfully", isMock: true });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("RAZORPAY VERIFY ERROR:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get('/get-key', verifyToken, (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
