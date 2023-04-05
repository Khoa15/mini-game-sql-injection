const mysql = require("mysql")

function conn() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        port: 3306,
        database: null
    })
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }

module.exports = conn