const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : {
     type : String,
     required : true, 
     unique : true
    },
    password : String,
    area : String,
    orders : [{
        type : mongoose.Schema.Types.ObjectId,
         ref:"Order"
    }]
});

const vendorModel = mongoose.model("vendor", vendorSchema);

module.exports = vendorModel