const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');// npm install jsonwebtoken

/* JWT-> é um padrão de autenticação segura entre cliente */


const app = express();
app.use(cors());//permite chamadas do react
app.use(express.json());


// select á BD
const userDb = [
	{id:1, email:"sergio@sergio.pt", pass:"1212", nome:"Sérgio"}
];

const secretToken = 'tokensergio';// chave de assinatura


app.post('/login',(req, res)=>{
	const {email, pass}= req.body;
	
	// validar o user
	const user= userDb.find(u => u.email === email && u.pass == pass);
	// erro 401-> unAuthorized
	if(!user)
		return res.status(401).json({erro: 'Dados invalidos!'});
	// gerar o token (JWT), com o id, nome do user e a valida(1 hora)
	//sign(dados, assinatura, validade)
	const token = jwt.sign({userId: user.id, nome: user.nome}, secretToken,{expiresIn: '1h'});
	res.json({token});
});

app.listen(4000, ()=>{
	console.log("Servidor na porta 5000");
})






