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
    order_date: {
        type: Date,
        required: true
    },
    credit_card: {
        type: String,
        maxlength: 4,
        required: true
    },
});

module.exports = mongoose.model('orders', OrdersSchema);