var mongoose = require("mongoose");
var cartSchema = mongoose.Schema(
    {
        _idcustomer: {
            type: mongoose.Schema.Types.ObjectId, ref: 'customer',
            require: true
        },
        _idcreater: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user',
            require: true
        },
        total: {
            type: Number,
            require: true
        },
        time: {
            type: Date,
            default: Date.now
        }

    }
);
var cart = mongoose.model('cart', cartSchema);
module.exports = cart;