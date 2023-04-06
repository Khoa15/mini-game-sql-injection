const express = require("express")
const Router = express.Router()
const exer = require("../controllers/exercise.controller")
const authe = require("../middlewares/authentication")

Router.get("/", authe.authentication, exer.queue_view)
Router.route("/:ex/stage/:stage").get(authe.authentication, exer.stage_view).post(authe.authentication, exer.stage_submit)

module.exports = Router