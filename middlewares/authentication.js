require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.authentication = async (req, res, next) =>{
    if("accessToken" in req.cookies){
        const token = req.cookies["accessToken"]
        const decoded = await jwt.verify(token, process.env.PRIVATE_KEY)
        if(decoded.username == "Guest"){
            next()
            return
        }
        if (req.originalUrl === "/"){
            res.redirect("/exercise")
            return
        }
        next()
        return
    }else{
        if (req.originalUrl === "/" || req.originalUrl === "/control"){
            next()
            return
        }
        res.status(500).json({
            "status": 500,
            "message": "Failed Authentication!"
        })
        return
    }
    next()
    return
    next()
}

exports.limitConnection = async (req, res, next)=>{
    
}
