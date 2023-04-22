const User = require("../models/user.model")
const axios = require("axios")
const jwt = require("jsonwebtoken")
function UserSocket(io, stage){

    const login = (msg)=>{
        if (stage.users.length > 30) return false
        const user = new User(msg)
        stage.appendUser(user)
        io.emit("user:get", [user])
        return [user]
    }

    const reconnect = async (cookies)=>{
        try{
            let cookie = cookies.split(";")
            let token = cookie.map(c => c.split("="))
            token = token.find(t => t[0] == "accessToken")[1]
            delete cookie, token
            const decoded = await jwt.verify(token, process.env.PRIVATE_KEY)
            console.log("Welcome: ", decoded.name)
        }catch(err){
            console.log(err)
        }
    }

    const find = (id) => {
        return users.findIndex(q => q["id"] == id)
    }

    const logout = (id) => {
        delete users.find(id)
        return users.find(id)
    }

    const update_room = (room_id) => {
        io.emit("user:list", stage.users || [])
        return stage.users
    }

    const next_stage = async ({info, accessToken}) =>{
        try{
            const uindex = stage.users.findIndex(u => u.id == accessToken)
            if(uindex){
                throw "User doesn't exist!"
            }
            const user = stage.users[uindex]
            if(info.submit.length == 0) return false
            user.stage.info.push(info)
            user.stage.curStage = info.stage
            stage.users[uindex] = user
            console.log("=============Next stage")
            console.log(stage.users[uindex])
            console.log("SUBMIT===")
            console.log(stage.users[uindex].stage)
            console.log("=============./Next stage")
        }catch(err){
            console.log(err)
        }
    }

    const list = () => {
        // io.emit("admin:user:list", stage.users)
        return stage.users
    }

    return{
        login,
        reconnect,
        find,
        logout,
        update_room,
        next_stage,
        list,
    }
}

module.exports = UserSocket