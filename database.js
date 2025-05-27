//npm i mysql2
async function connect(){
    const mysql = require("mysql2/promise");
    if(global.connection && global.connect.state != 'disconnected')
        return global.connecttion;
    const connecttion = await mysql.createConnection("mysql://root:@localhost:3306/react22");
    global.connecttion = connecttion;
    console.log("Ligado ao server na porta 3306")
    return connecttion;
}

async function selectTeam1(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT jogador.id, jogador.nome, jogador.golos FROM jogador INNER JOIN equipa ON equipa.id = jogador.idteam WHERE equipa.id = 1;');
    return rows;
}
async function selectTeam2(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT jogador.id, jogador.nome, jogador.golos FROM jogador INNER JOIN equipa ON equipa.id = jogador.idteam WHERE equipa.id = 2;');
    return rows;
}

async function selectConfronto(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM confronto;');
    return rows[0];
}

module.exports = {selectTeam1, selectTeam2, selectConfronto}