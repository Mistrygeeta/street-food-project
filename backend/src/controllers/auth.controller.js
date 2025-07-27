const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const vendorModel = require("../models/vendor.model")
const supplierModel = require("../models/supplier.model")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET is:", JWT_SECRET);

//registration controller
const registerUser = async (req, res)=>{
    const {role ,name,phone, email, password,area } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        if(role === "vendor"){
            const existing = await vendorModel.findOne({email});
            if(existing){
                return res.status(400).json({
                    message : "email is already exist"
                })
            }
                const vendor = new vendorModel({
                    name, phone, email, password:hashedPassword , area
                });
                
const token = jwt.sign({ id: vendor._id, role }, JWT_SECRET, { expiresIn: "7d" });
                await vendor.save();
                res.status(201).json({
                    message:"vendor is registered successfully",
                    token,
        user: {
          id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          area: vendor.area,
          role,
        },
                })
            }
            else if(role === "supplier"){
                const existing = await supplierModel.findOne({email});

                if(existing){
                    return res.status(400).json({
                        message : "email is already exist"
                    });
                }
                    const supplier =  new supplierModel ({
                        name, phone, area, email, password : hashedPassword
                    });

                    await supplier.save();
                    const token = jwt.sign({ id: supplier._id, role }, JWT_SECRET, { expiresIn: "7d" });
                    res.status(201).json({
                        message: "supplier registered successfully",
                         token,
        user: {
          id: supplier._id,
          name: supplier.name,
          email: supplier.email,
          area: supplier.area,
          role,
        },
                    });
                }
                else{
                    res.status(400).json({
                        message : "Inavlid role"
                    });
                }
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    message : "something wrong"
                });
            };
        };

        //login controller 
        const loginUser = async(req, res)=>{
            const {role, email, password} = req.body;

            try{
                let user;
                if(role=== "vendor"){
                    user = await vendorModel.findOne({email});

                }else if (role === "supplier"){
                    user = await supplierModel.findOne({email});
                }
                else{
                    return res.status(400).json({
                        message : "Invalid role"
                    })
                }

                if(!user) {return res.status(400).json({
                    message : "user not found"
                })
                }
                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch) {return res.status(401).json({
                    message : "Invalid credentials"
                });
            }
                const token = jwt.sign({id: user._id, role}, JWT_SECRET,{expiresIn :"7d"})
                res.status(200).json({
                    message : "Login successful",
                    token,
                    user:{
                        id: user._id,
                        name: user.name,
                        email : user.email,
                        area : user.area,
                        role
                    }
                });
            }
                catch(err){
                    console.log(err)
                    res.status(500).json({
                        message : "something wrong"
                    })
                }
            };

            module.exports = {registerUser,loginUser}
        