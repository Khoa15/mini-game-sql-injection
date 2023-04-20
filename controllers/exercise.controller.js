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
        title: 'Stage '+stage,
        stage: stage
    }
    console.log("test/stage_"+stage)
    res.status(200).render("test/stage_1", {data})
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
            let response = {sts: result.result.sts, data: []}
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



