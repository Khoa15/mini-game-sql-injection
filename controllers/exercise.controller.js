const User = require("../models/user.model")
exports.queue_view = async (req, res) => {
    const data = {
        title: 'Queue\' Exercise',
    }
    res.render("test/queue", {data})
}

exports.stage_view = async (req, res) => {
    const stage = req.params["stage"]
    const data = {
        title: 'Stage '+stage
    }
    res.render("test/stage", {data})
}

exports.stage_submit = async (req, res, next) => {
    try {
        const stage = req.params["stage"]
        if("username" in req.body && "password" in req.body){
            const username = req.body['username']
            const password = req.body['password']
            const user = new User({username: username, password: password})
            const result = await user.login()
            res.json(result)
        }
        res.redirect("./"+stage)
    } catch (error) {
        next(error)
    }
}



