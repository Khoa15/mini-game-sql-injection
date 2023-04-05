require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.login = async (req, res)=>{
    try{
        const username = req.body.username
        const room_id = req.body.room_id
        const maxAge = 30 * 24 * 60 * 60
        const token = await jwt.sign({
                        username: username,
                        room_id: room_id
                    }, process.env.PRIVATE_KEY,
                    {
                        expiresIn: maxAge
                    })
        res.cookie("accessToken", token, {expiresIn: maxAge * 1000})
        res.redirect("/")
    }catch(err){
        res.send(err)
    }
}

exports.login_view = async (req, res) => {
    const data = {
        title: 'Login user',
        link_action: "/api/v1/login"
    }
    res.render("login", {data})
}

