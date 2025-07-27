const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    quantity :Number,
    supplierid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier"
    }
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel