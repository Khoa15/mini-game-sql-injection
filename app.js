require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const cors = require('cors')
// const { Server } = require("socket.io")
// const io = new Server(server)
const io = require("socket.io")(server)
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 5555

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("views"))
app.set("views", "./views")
app.set("view engine", "ejs")

const userRoute = require("./routes/user.route")
const adminRoute = require("./routes/admin.route")
const exerciseRoute = require("./routes/exercise.route")
const apiRoute = require("./routes/api.route")
const { handleError } = require("./middlewares/handleError")

app.use(cors())
app.use("/", userRoute)
app.use("/control", adminRoute)
app.use("/exercise", exerciseRoute)
app.use("/api/v1/", apiRoute)
app.use(handleError)

const stage = require("./models/stage.model")
const user = require("./controllers/user.socket.controller")(io, stage)

const onConnection = (socket) => {
    if(io.engine.clientsCount > 4){
        console.log("Limit")
        socket.disconnect()
        return
    }

    //User connected
    if(socket.handshake.headers.cookie){
        // console.log(socket.handshake.headers)
        user.reconnect(socket.handshake.headers.cookie)
    }

    socket.on("user:login", user.login)
    socket.on("user:update:room", user.update_room)
    socket.on("user:next-stage", user.next_stage)
    socket.on("admin:user:list", user.update_room)
    socket.on("admin:start", ()=>{
        stage.status = 1
        stage.users.forEach(u => u.status = 2)
        io.emit("admin:start")
    })

    socket.on("user:send:mail", (data)=>{
        io.emit("admin:receive:mail", data)
    })


    socket.on("disconnecting", async ()=>{
        await user.disconnect(socket.handshake.headers.cookie)
    })
}

io.on("connection", onConnection)

server.listen(port, ()=>{
    console.log(`Listenning on port ${port}`)
})