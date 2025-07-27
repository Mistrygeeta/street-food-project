const jwt = require("jsonwebtoken");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
         return res.status(401).json({
        message : "token is not provided"
    })
}
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: "Invalid token!"
        });
    }
}



module.exports = verifyToken;