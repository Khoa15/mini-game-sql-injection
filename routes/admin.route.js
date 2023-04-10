const express = require("express")
const Router = express.Router()
const admin = require("../controllers/admin.controller")
const { authentication } = require("../middlewares/authentication")

Router.route("/").get(admin.view_signin).post(authentication, admin.signIn)

module.exports = Router