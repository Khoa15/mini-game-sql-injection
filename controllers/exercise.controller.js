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