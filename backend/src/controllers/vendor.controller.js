const vendorModel= require("../models/vendor.model");
const supplierModel = require("../models/supplier.model");
const productModel = require("../models/product.model")
const orderModel = require("../models/order.model")

const getSupplierByArea = async(req, res)=>{
    try{
        const vendor = await vendorModel.findById(req.user.id);
        if(!vendor){
            return res.status(404).json({
                message : "vendor not found"
            })
        }
        const suppliers = await supplierModel.find({area : vendor.area});
         
        const result = suppliers.map((supplier) =>{
            const total = supplier.rating.reduce((a,b)=> a + b,0);
            const avg = supplier.rating.length?(total/ supplier.rating.length).toFixed(1): "N/A";

            return{
                id : supplier._id,
                name : supplier.name,
                area : supplier.area,
                avgRating :avg
            }
        });
        res.status(200).json(result)
    }catch(err){
console.log(err)
res.status(500).json({
    message : "server error while fetching supplier"
})
    }
}

const getSupplierProducts = async (req, res)=>{
    try{
        const {supplierId} = req.params;
        const products = await productModel.find({supplierId});

        res.status(200).json(products)
    }catch(err){
        console.error(err);
        res.status(500).json({
            message : "failed to fetch products"
        })
    }
}

const placeOrder = async(req, res)=>{
  try{
    const vendorId = req.user.id;
    const {supplierId, products, total} = req.body;
    
    const newOrder = new orderModel({
        vendorId,
        supplierId,
        products,total,
        status : "pending"
    });

    await newOrder.save();

    await vendorModel.findByIdAndUpdate(vendorId,{$push: {orders: newOrder._id}
    });
    res.status(201).json({
        message: "order placed successfully",
        orderId : newOrder._id
    });
  }catch(err){
    console.error(err);
    res.status(500).json({
        message : "failed to place order"
    })
  }
};

const getVendorOrder = async(req,res)=>{
    try{
        const vendorId = req.user.id;
        const orders = await orderModel.find({vendorId}).populate("supplierId", "name area").sort({createdAt: -1});

        res.status(200).json(orders);
    }catch(err){
        console.error(err)
        res.status(500).json({
            message: "failed to fetched orders"
        })
    }
}
const getVendorProfile = async (req, res) => {
  try {
    const vendor = await vendorModel.findById(req.user.id).select("-password");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching vendor profile" });
  }
};

module.exports = {getSupplierByArea, getSupplierProducts,placeOrder,getVendorOrder,getVendorProfile};