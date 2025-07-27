const mongoose = require ("mongoose");


const supplierSchema = new mongoose.Schema({
    name : String,
    phone: String,
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    area : String,
    products :[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    rating :{
        type : [Number],
        default:[]
    }
})

const supplierModel = mongoose.model("supplier", supplierSchema);

module.exports = supplierModel