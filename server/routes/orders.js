const router = require('express').Router();
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/auth');

// CREATE
router.post('/', verifyToken, async (req, res) => {
    console.log("Creating Order with data:", req.body);
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();

        // Create Payment record
        const Payment = require('../models/Payment');
        const newPayment = new Payment({
            userId: savedOrder.userId,
            orderId: savedOrder._id,
            amount: savedOrder.amount,
            method: savedOrder.paymentId === "COD" ? "COD" : "ONLINE",
            paymentId: savedOrder.paymentId,
            status: savedOrder.status === "paid" ? "completed" : "pending"
        });
        await newPayment.save();

        // Decrement stock for each product in the order
        const Product = require('../models/Product');
        for (let item of req.body.products) {
            const qty = Number(item.quantity) || 1;
            const updatedProduct = await Product.findByIdAndUpdate(item.productId, {
                $inc: { stockQuantity: -qty }
            }, { new: true });

            // Automatically update inStock status if it falls to 0 or below
            if (updatedProduct && updatedProduct.stockQuantity <= 0) {
                await Product.findByIdAndUpdate(item.productId, { inStock: false, stockQuantity: 0 });
            }
        }

        console.log("Order saved successfully:", savedOrder._id);
        res.status(200).json(savedOrder);
    } catch (err) {
        console.error("ORDER CREATE ERROR DETAIL:", err);
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'username')
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
