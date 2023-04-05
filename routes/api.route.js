const express = require("express")
const Router = express.Router()
const user = require("../controllers/user.controller")

Router.route("/login").post(user.login)

module.exports = Router