const User = require("../models/user.model")
const axios = require("axios")
const jwt = require("jsonwebtoken")
function UserSocket(io, stage){

    const splitCookieToken = (cookies)=>{
        let cookie = cookies.split(";")
        let token = cookie.map(c => c.split("="))
        token = token.find(t => t[0] == "accessToken")[1]
        return token
    }

    const verify = async (token) => {
        return await jwt.verify(token, process.env.PRIVATE_KEY)
    }

    const login = (msg)=>{
        if (stage.users.length > 30) return false
        const user = new User(msg)
        stage.appendUser(user)
        io.emit("user:get", [user])
        return [user]
    }

    const reconnect = async (cookies)=>{
        try{
            const token = splitCookieToken(cookies)
            const decoded = await verify(token)
            if(decoded.key_private != "123Admin456"){
                login({"id":decoded.id, "name":decoded.username})
            }
            console.log("Welcome: ", decoded.username)
            return 
        }catch(err){
            console.log(err)
        }
    }

    const find = (id) => {
        return stage.users.findIndex(q => q["id"] == id)
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
            if(uindex == -1){
                throw "User doesn't exist!"
            }
            const user = stage.users[uindex]
            user.stage.info.push(info)
            user.stage.curStage = info.stage
            if(info.stage == 5){
                user.status = 3
            }
            stage.users[uindex].timing += info.timing
            stage.users[uindex] = user
            info.timing = stage.users[uindex].timing
            io.emit("user:submit", ({info, uid}))
        }catch(err){
            console.log(err)
        }
    }

    const list = () => {
        return stage.users
    }

    const disconnect = async (cookies) => {
        try {
            const token = splitCookieToken(cookies)
            const decoded = await verify(token)
            if(decoded.key_private != "123Admin456"){
                const uindex = find(decoded.id)
                stage.users[uindex].status = 0
                if(await stage.disconnect(decoded.id) && stage.status == 0){
                    io.emit("user:disconnect", (decoded.id))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return{
        login,
        reconnect,
        find,
        logout,
        update_room,
        next_stage,
        list,
        disconnect
    }
}

module.exports = UserSocket