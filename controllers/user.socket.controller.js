const User = require("../models/user.model")
const axios = require("axios")
function UserSocket(io, stage){
    const users = {}
    let status = []

    const login = (msg)=>{
        if (users.length > 30) return false
        const user = new User(msg)
        status = user
        if(!users[user.room_id]){
            users[user.room_id] = []
        }
        users[user.room_id].push(user)
        stage.appendUser(user)
        console.log(user)
        io.emit("user:get", [user])
        return [user]
    }

    const find = (id) => {
        return users.findIndex(q => q["id"] == id)
    }

    const logout = (id) => {
        delete users.find(id)
        return users.find(id)
    }

    const update_room = (room_id) => {
        room_id = status.room_id
        io.emit("user:list", stage.getCurStage()["users"] || [])
        return users[room_id]
    }

    const next_stage = (accessToken) =>{
        stage.getCurStage()["users"][stage.getCurStage()["users"].findIndex(u => u.id == accessToken)].stage.cur += 1
        
    }

    return{
        login,
        find,
        logout,
        update_room,
        next_stage
    }
}

module.exports = UserSocket