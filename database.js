//npm install mysql2

async function connect() {
    const mysql = require("mysql2/promise")
    if (global.connection && global.connection.state != 'disconnect')
        return global.connection;
    const connection = await mysql.createConnection(
        "mysql://root:@localhost:3306/codeprog22"
    );
    global.connection = connection;
    console.log("Ligado ao servidor na porta 3306")
    return connection
}

async function selectTeam1() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT jogador.id,jogador.nome,pontos FROM jogador INNER JOIN team ON team.id = jogador.idteam WHERE team.id = 1;');
    return rows;
}

async function selectTeam2() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT jogador.id,jogador.nome,pontos FROM jogador INNER JOIN team ON team.id = jogador.idteam WHERE team.id = 2;');
    return rows;
}

async function selectConfronto() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM confronto');
    return rows[0];
}

module.exports = { selectTeam1, selectTeam2, selectConfronto }
