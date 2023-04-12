const express = require("express")
const Router = express.Router()
const admin = require("../controllers/admin.controller")
const { authentication } = require("../middlewares/authentication")

Router.route("/").get(admin.view_signin).post(authentication, admin.signIn)
Router.route("/panel").get(admin.view_panel)
module.exports = Router