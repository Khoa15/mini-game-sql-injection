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
            delete cookie
            const decoded = await jwt.verify(token, process.env.PRIVATE_KEY)
            if(decoded.key_private != "123Admin456"){
                login({"id":decoded.id, "name":decoded.username})
            }
            console.log("Welcome: ", decoded.username)
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

    const update_room = () => {
        io.emit("user:list", stage.users || [])
        return stage.users
    }

    const next_stage = async ({info, uid}) =>{
        try{
            const uindex = stage.users.findIndex(u => u.id == uid)
            console.log(info, uid, uindex)
            if(uindex == -1){
                throw "User doesn't exist!"
            }
            const user = stage.users[uindex]
            user.stage.info.push(info)
            user.stage.curStage = info.stage
            stage.users[uindex].timing += info.timing
            stage.users[uindex] = user
            io.emit("user:submit", ({info, uid}))
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