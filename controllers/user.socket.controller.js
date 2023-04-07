const User = require("../models/user.model")

function UserSocket(io){
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
        console.log("Greay", status)
        io.emit("user:list", users[room_id] || [])
        return users[room_id]
    }

    return{
        login,
        find,
        logout,
        update_room
    }
}

module.exports = UserSocket