const express = require("express")
const Router = express.Router()
const user = require("../controllers/user.controller")
const authe = require("../middlewares/authentication")


Router.get("/", authe.authentication, user.login_view)
Router.get("/scoreboard", authe.authentication, user.scoreboard_view)
module.exports = Router