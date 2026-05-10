const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true }, // 'COD' or 'ONLINE'
    paymentId: { type: String }, // Razorpay Payment ID or 'COD'
    status: { type: String, default: 'pending' }, // 'pending', 'completed', 'failed'
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
