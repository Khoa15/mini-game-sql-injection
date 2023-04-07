require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
// const { Server } = require("socket.io")
// const io = new Server(server)
const io = require("socket.io")(server)
const cookieParser = require("cookie-parser")
const user = require("./controllers/user.socket.controller")(io)

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

app.use("/", userRoute)
app.use("/exercise", exerciseRoute)
app.use("/api/v1/", apiRoute)
app.use(handleError)

const onConnection = (socket) => {
    if(io.engine.clientsCount > 4){
        console.log("Limit")
        socket.disconnect()
        return
    }
    
    socket.on("user:login", user.login)
    socket.on("user:update:room", user.update_room)

    // socket.on("disconnect", user.logout(socket.id))
}

io.on("connection", onConnection)

server.listen(port, ()=>{
    console.log(`Listenning on port ${port}`)
})