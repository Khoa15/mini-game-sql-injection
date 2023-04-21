const jwt = require("jsonwebtoken")

exports.login = async (req, res)=>{
    try{
        const username = req.body.username || "Guest"
        const uid = req.body.uid
        const maxAge = 30 * 24 * 60 * 60
        const token = await jwt.sign({
                        "id": uid,
                        "username": username,
                        "key_private": NaN,
                        "stage":[
                            {
                                "status": false,
                                "endTime": 0,
                            },
                            {
                                "status": false,
                                "endTime": 0,
                            },
                            {
                                "status": false,
                                "endTime": 0,
                            },
                            {
                                "status": false,
                                "endTime": 0,
                            },
                            {
                                "status": false,
                                "endTime": 0,
                            },
                        ]
                    }, process.env.PRIVATE_KEY,
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