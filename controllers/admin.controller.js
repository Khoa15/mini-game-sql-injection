require("dotenv").config()
const jwt = require("jsonwebtoken")
exports.view_signin = (req, res, next)=>{
    try{
        const data = {
            title: "Control panel"
        }
        res.render("admin/signin", {data})
    }catch(err){
        next(err)
    }
}

exports.view_panel = (req, res, next) => {
    try{
        const err = new Error()
        if("accessToken" in req.cookies === false){
            err.statusCode = 500
            next(err)
            return
        }
        const data = {
            title: "Control Panel",
            admin: false,
        }
        res.render("admin/control", {data})
    }catch(err){
        next(err)
    }
}

exports.signIn = async(req, res, next) =>{
    try{
        const err = new Error("Some problem are occured!")
        if(req.method != "POST"){
            next(err)
            return
        }
        
        const key_privary = req.body["key_private"]
        console.log(req.method)
        if(key_privary != "!@#$%^&*()0"){
            next(err)
            return
        }
        const maxAge = 30*24*60*60
        const token = jwt.sign({
            "username": "admin",
            "permission": 5,
            "key_private": "123Admin456",
        }, process.env.PRIVATE_KEY,
        {
            expiresIn: maxAge
        })

        res.cookie("accessToken", token, {expiresIn: maxAge * 1000})
        res.json({
            "sts": 1,
            "message": "Sign-in successfully!"
        })
    }catch(err){
        next(err)
    }
}