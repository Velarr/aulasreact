// database.js
const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',    
    database: 'codeprog22'
  });

  global.connection = connection;
  console.log(" Ligado ao MySQL (database.js)");
  return connection;
}

async function findAdminByEmailAndPass(email, pass) {
  try {
    const conn = await connect();
    const [rows] = await conn.query(
      'SELECT * FROM admin WHERE email = ? AND pass = ?',
      [email, pass]
    );
    return rows[0];
  } catch (error) {
    console.error(" Erro ao consultar admin:", error);
    throw error;
  }
}

module.exports = { findAdminByEmailAndPass };
