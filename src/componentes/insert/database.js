// database.js
const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const connection = await mysql.createConnection("mysql://root:@localhost:3306/codeprog22");
  global.connection = connection;
  console.log("Ligado ao server na porta 3306");
  return connection;
}

async function insertAdmin(email, pass) {
    const conn = await connect();
    const sql = 'INSERT INTO admin (email, pass) VALUES (?, ?)';
    const values = [email, pass];
    await conn.query(sql, values);
  }
  

module.exports = { insertAdmin };
