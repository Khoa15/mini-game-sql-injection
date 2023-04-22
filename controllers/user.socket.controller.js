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
        io.emit("user:list", stage.users || [])
        return stage.users
    }

    const next_stage = async ({info, accessToken}) =>{
        try{
            const uindex = stage.users.findIndex(u => u.id == accessToken)
            const user = stage.users[uindex]
            user.stage.info.push({ stage: info.currStage, submit: info.submit})
            user.stage.curStage = info.currStage
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
        find,
        logout,
        update_room,
        next_stage,
        list
    }
}

module.exports = UserSocket