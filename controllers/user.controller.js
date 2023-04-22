const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
exports.login = async (req, res)=>{
    
    try{
        const username = req.body.username// || "Guest"
        if (username == undefined){
            throw "Username is missed"
        }
        const uid = req.body.uid
        const maxAge = 30 * 24 * 60 * 60
        const user = {
            id: uid,
            name: username,
            score: 0,
            status: 0,
            stage: {curStage: 0, info: []}
        }
        const token = await jwt.sign(user, process.env.PRIVATE_KEY,
            {
                expiresIn: maxAge
            })            
        res.cookie("accessToken", token, {expiresIn: maxAge * 1000})
        res.send({
            "sts": 1,
            "accessToken": token
        })
    }catch(err){
        res.send(err)
    }
}

exports.login_view = async (req, res) => {
    const data = {
        title: 'Login user',
        link_action: "/api/v1/login",
    }
    res.render("login", {data})
}

exports.home_view = async(req, res)=>{
    const data = {
        title: 'Demo SQLi',
    }
    res.render("home", {data})
}

exports.scoreboard_view = async(req, res)=>{
    const data ={
        title: "Scoreboard"
    }
    res.render("scoreboard", {data})
}