const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const port = 3000

app.get("/", (req, res)=>{
    res.send("hi")
})

io.on("connection", (socket)=>{
    console.log(`A user connected`)
})

server.listen(port, ()=>{
    console.log(`Listenning on port ${port}`)
})