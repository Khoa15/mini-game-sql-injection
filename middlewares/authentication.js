require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.authentication = async (req, res, next) =>{
    // if("accessToken" in req.cookies){
    //     const token = req.cookies["accessToken"]
    //     const decoded = await jwt.verify(token, process.env.PRIVATE_KEY)
    //     if (req.originalUrl === "/"){
    //         res.redirect("/exercise")
    //         return
    //     }
    //     next()
    // }else{
    //     if (req.originalUrl === "/"){
    //         next()
    //         return
    //     }
    //     res.status(404)
    // }
    next()
}

exports.limitConnection = async (req, res, next)=>{
    
}
