const conn = require("../config/db.config")

class User{
    constructor(
        {id,
        name,
        room_id,
        score,
        status=1}
    ){
        this.id = id
        this.name = name
        this.room_id = room_id
        this.score = score
        this.status = status
    }

    create(){

    }

    edit(){

    }

    async get(where = {}){
        let g = `SELECT * FROM ${table}`
        if(where){
            g += ` WHERE `
        }
        const result = await conn.query()
        return result
    }
}



module.exports = User