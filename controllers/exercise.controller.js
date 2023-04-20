require("dotenv").config()
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
exports.queue_view = async (req, res) => {
    const data = {
        title: 'Queue\' Exercise',
    }
    res.render("test/queue", {data})
}

exports.stage_view = async (req, res, next) => {
    const stage = req.params["stage"]
    if(stage < 6 && stage > 0){
        const _token = req.cookies["accessToken"]
        const decoded = await jwt.verify(_token, process.env.PRIVATE_KEY)
        const data = {
            title: 'Stage '+stage,
            stage: stage,
            status: decoded["stage"][stage-1]
        }
        console.log("Stage: "+stage)
        res.status(200).render("test/stage", {data})
    }else{
        res.status(500).send("Error Stage")
    }
    return
}

exports.stage_submit = async (req, res, next) => {
    try {
        const stage = req.params["stage"]
        /*
            In-band
            --Union
            --Error
            Inferential(Blind)
            --Boolean
            --Time
            Out of band
        */
        if("username" in req.body && "password" in req.body){
            const username = req.body['username']
            const password = req.body['password']
            const user = new User({username: username, password: password})
            const result = await user.login()
            console.log(result)
            let response = {sts: result.result.sts, data: []}
            response["message"] = "Failed"
            if(result.result.msg.recordset.length){
                response["message"] = "Successfully"
            }

            if(stage == 1 || stage == 2){
                response.data = result.result.msg
                if(response.sts == 1){
                    response.data = response.data.recordset
                }
            }
            res.status(200).json(response)
            return
        }
        res.redirect("./"+stage)
    } catch (error) {
        next(error)
    }
}



