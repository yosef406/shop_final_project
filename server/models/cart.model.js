const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        default: []
    }],
    total_price: {
        type: Number,
        default: 0
    },
    open: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('carts', CartSchema);