// const mysql = require("mysql")
// class Conn{
//   constructor(
//     host = "localhost", 
//     user="root", 
//     password = "", 
//     port = 3306, 
//     database = "db_library_dev"){
//     this.connection = mysql.createConnection({
//       host: host,
//       user: user,
//       password: password,
//       port: port,
//       database: database
//     })
//   }

//   deconstructor(){
//     this.connection.close()
//   }

//   query(q){
//     return new Promise((resolve, reject) => {
//       const handler = (error, result) =>{
//         if(error){
//           reject(error)
//           return
//         }
//         resolve(result)
//       }
//       this.connection.query(q, handler)
//     })
//   }
// }
// const conn = new Conn()
// module.exports = conn
const mssql = require('mssql')
var Connection = require('tedious').Connection;
/*
Enable TCP/TP
*/
const DATABASE = "sql_injection"
const USER = "sa"
const PASSWORD = "123"
const SERVER = "localhost"//DESKTOP-L3D0UJ9\\SQLEXPRESS
class Conn {
  constructor() {
    this.sqlConfig = {
      server: SERVER,
      database: DATABASE,
      user: USER,
      password: PASSWORD,
      options: {
        encrypt: false,
      }
    }

  }

  async query(q) {
    try {
      await mssql.connect(this.sqlConfig)
      console.log(q)
      const result = await mssql.query(q)
      return {sts: 1, msg: result}
    } catch (err) {
      console.log(err)
      return {sts:0, msg: []}
    }
  }
}
const conn = new Conn()
module.exports = conn