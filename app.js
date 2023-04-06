require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const cookieParser = require("cookie-parser")
const user = require("./controllers/user.socket.controller")

const port = process.env.PORT || 5555

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("views"))
app.set("views", "./views")
app.set("view engine", "ejs")

const userRoute = require("./routes/user.route")
const exerciseRoute = require("./routes/exercise.route")
const apiRoute = require("./routes/api.route")
const { handleError } = require("./middlewares/handleError")
const { randomInt } = require("crypto")

app.use("/", userRoute)
app.use("/exercise", exerciseRoute)
app.use("/api/v1/", apiRoute)
app.use(handleError)

io.on("connection", (socket)=>{
    if(io.engine.clientsCount > 4){
        console.log("Limit")
        socket.disconnect()
        return
    }
    socket.on("user:login", async (msg)=>{
        console.log("hey")
        io.emit("user:get", user.login(msg))
    })
    socket.on("update:user:room", ()=>{
        io.emit("user:list", user.update_room(user.status.room_id))
    })

    // socket.on("disconnect", user.logout(socket.id))
})

server.listen(port, ()=>{
    console.log(`Listenning on port ${port}`)
})