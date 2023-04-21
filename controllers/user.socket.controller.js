const User = require("../models/user.model")
const axios = require("axios")
const jwt = require("jsonwebtoken")
function UserSocket(io, stage){

    const login = (msg)=>{
        if (stage.users.length > 30) return false
        const user = new User(msg)
        stage.appendUser(user)
        console.log(stage.users)
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

    const next_stage = async ({info, accessToken}) =>{
        // console.log(info)
        // const decoded = await jwt.verify(accessToken, process.env.PRIVATE_KEY)
        console.log(stage.users.find(u => u.id == accessToken), info, "===============")
        // stage.getCurStage()["users"][stage.getCurStage()["users"].findIndex(u => u.id == accessToken)].stage.cur += 1
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