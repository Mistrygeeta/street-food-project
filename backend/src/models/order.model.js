const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vender"
    },

    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier"
    },
    products:[{
        name: String,
        quantity: Number,
        price : Number
    }],
    total: Number,
    status : {
        type: String,
        default: "pending"
    }
})

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel