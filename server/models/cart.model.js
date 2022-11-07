const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date_created: {
        type: Date,
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
    }
});

module.exports = mongoose.model('carts', CartSchema);