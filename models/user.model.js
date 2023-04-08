const conn = require("../config/db.config")

class User{
    #table = "users"
    constructor(
        {id=null,
        name = null,
        room_id = null,
        score = null,
        status=1,
        username=null,
        password=null,}
    ){
        this.id = id
        this.name = name
        this.room_id = room_id
        this.score = score
        this.status = status
        this.username = username
        this.password = password
    }

    create(){

    }

    edit(){

    }

    async login(){
        let q = `SELECT * FROM ${this.#table} WHERE email = "${this.username}" AND password = "${this.password}"`
        const result = await conn.query(q).catch()
        return result
    }

    async get(where = {}){
        let g = `SELECT * FROM ${this.#table}`
        if(where){
            g += ` WHERE `
        }
        const result = await conn.query()
        return result
    }
}



module.exports = User