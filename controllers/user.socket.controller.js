const User = require("../models/user.model")
exports.users = {}
exports.status = []

exports.login = (msg)=>{
    if (this.users.length > 30) return false
    const user = new User(msg)
    this.status = user
    if(!this.users[user.room_id]){
        this.users[user.room_id] = []
    }
    this.users[user.room_id].push(user)
    console.log(msg)
    return [user]
}


exports.find = (id) => {
    return this.users.findIndex(q => q["id"] == id)
}

exports.logout = (id) => {
    delete this.users.find(id)
    return this.users.find(id)
}

exports.update_room = (room_id) => {
    return this.users[room_id]
}