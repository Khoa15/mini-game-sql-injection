const express = require("express")
const Router = express.Router()
const exer = require("../controllers/exercise.controller")
const authe = require("../middlewares/authentication")

Router.get("/", authe.authentication, exer.queue_view)
Router.get("/:ex/stage/:stage", authe.authentication, exer.stage_view)

module.exports = Router