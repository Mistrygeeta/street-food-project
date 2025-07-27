const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

const addProduct = async (req, res)=>{
    try{
        const supplierId = req.user.id;

        const {name, price,quantity}= req.body;

        const newProduct = new productModel({
            name,
            price,
            quantity, 
            supplierId
        });

        await newProduct.save();
        res.status(201).json({
            message : "product added",
            product: newProduct
        });
    }catch(err){
        res.status(201).json({
            message : "Error adding product"
        })
    }
};

const getMyProducts = async (req, res)=>{
    try{
        const supplierId = req.user.id;

        const products = await productModel.find({supplierId});
        res.status(200).json(products);
    }catch(err){
        console.error(err)
        res.status(500).json({
            message: "failed to fetch products"
        });
    }
};

const updateProduct = async(req, res)=>{
    try{
        const {productId} = req.params;
        const supplierId = req.user.id;

        const updated = await productModel.findOneAndUpdate({
            _id: productId,supplierId,
        },req.body,{new:true});
        if(!updated){
            return res.status(404).json({
                message : "product not found"
            })
        };
        res.status(200).json({
            message : "product updated",
            product : updated
        })
    } catch(err){
        res.status(500).json({
            message : "update failed"
        })
    }
}

const deleteProduct = async (req, res)=>{
    try{
        const {productId} = req.params;

        const supplierId= req.user.id;

        const deleted = await productModel.findOneAndDelete({
            _id : productId, supplierId
        });
        res.status(200).json({
            message : "product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "deleted failed"
        })
    }
}



const getSupplierOrders = async (req, res) => {
  try {
    const supplierId = req.user.id;

    const orders = await orderModel.find({ supplierId })
      .populate("vendorId", "name area") 
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 
    const supplierId = req.user.id;

    
    const order = await orderModel.findOne({ _id: id, supplierId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message:`Order ${status}`, order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};


module.exports = {
    addProduct,getMyProducts,updateProduct,deleteProduct,getSupplierOrders,updateOrderStatus
}