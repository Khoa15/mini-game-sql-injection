const express = require("express")
const Router = express.Router()
const user = require("../controllers/user.controller")
const authe = require("../middlewares/authentication")


Router.get("/", authe.authentication, user.login_view)

Router.get("/exercise", authe.authentication, user.exercise_view)

const user_io = require("../controllers/user.socket.controller")

Router.get("/get", (req, res)=>{
  res.send(user_io.users)
})

module.exports = Router