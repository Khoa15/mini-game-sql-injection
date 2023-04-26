const conn = require("../config/db.config")

class User{
    #table = "users"
    constructor(
        {
            id=null,
            name = null,
            timing = 0,
            status=1,
            username=null,
            password=null
        }
    ){
        this.id = id
        this.name = name
        this.timing = timing
        this.status = status
        this.stage = {curStage: 0, info: []}
        this.username=username
        this.password=password
    }

    create(){

    }

    edit(){

    }

    async login(){
        let q = `SELECT * FROM ${this.#table} WHERE username = '${this.username}' AND password = '${this.password}'`
        const result = await conn.query(q)
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