const express = require('express');// npm install express-> rotas htpp
const mysql = require('mysql2');// npm install mysql2
const cors = require('cors');// npm install cors, permite a comunicação com um srvidor que rode em portas diferentes.

const app = express();
app.use(cors());//permite chamadas do react
app.use(express.json());

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'codeprog22'
});

app.post('/contatos',(req, res)=>{
	const {nome,email}= req.body;
	const sql = 'INSERT INTO contatos (nome,email) VALUES(?,?)';
	db.query(sql, [nome,email],(err,result)=>{
		if(err)
			return res.status(500).send(err);
		res.send({status: 'OK', id: result.insertId});
	});
});

app.listen(5000, ()=>{
	console.log("Servidor na porta 5000");
})






