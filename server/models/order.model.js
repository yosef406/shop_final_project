const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    final_price: {
        type: Number,
        default: 0
    },
    delivery_city: {
        type: String,
        required: true
    },
    delivery_street: {
        type: String,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    credit_card: {
        type: String,
        max: 4,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('orders', OrdersSchema);