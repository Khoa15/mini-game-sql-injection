const User = require("../models/user.model")
exports.queue_view = async (req, res) => {
    const data = {
        title: 'Queue\' Exercise',
    }
    res.render("test/queue", {data})
}

exports.stage_view = async (req, res, next) => {
    const stage = req.params["stage"]
    const data = {
        title: 'Stage '+stage
    }
    res.status(200).render("test/stage", {data})
    return
}

exports.stage_submit = async (req, res, next) => {
    try {
        const stage = req.params["stage"]
        if("username" in req.body && "password" in req.body){
            const username = req.body['username']
            const password = req.body['password']
            const user = new User({username: username, password: password})
            const result = await user.login()
            let msg = "Login successfully"
            let stsCode = 1
            if (result.length === 0){
                msg = "Your username and your password were wrong"
                stsCode = 0
            }
            res.status(200).json({
                "status": stsCode,
                "message": msg,
                "data": result
            })
            return
        }
        res.redirect("./"+stage)
    } catch (error) {
        next(error)
    }
}



