const mysql = require("mysql")
class Conn{
  constructor(
    host = "localhost", 
    user="root", 
    password = "12345678", 
    port = 3306, 
    database = "id15865915_2hkdb"){
    this.connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      port: port,
      database: database
    })
  }

  deconstructor(){
    this.connection.close()
  }

  query(q){
    return new Promise((resolve, reject) => {
      const handler = (error, result) =>{
        if(error){
          reject(error)
          return
        }
        resolve(result)
      }
      this.connection.query(q, handler)
    })
  }
}
const conn = new Conn()
module.exports = conn