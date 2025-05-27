const express = require('express');// npm install express
const mysql = require('mysql2');// npm install mysql3
const cors = require('cors');// npm install cors, permite a comunicacao com um servidor que rode em portas diferentes.
const jwt = require('jsonwebtoken'); //npm i jsonwebtoken

// JWT-> é um padrão de autenticaco segura entre cliente

const app = express();
app.use(cors());//permite chamadas do react
app.use(express.json());



const userDB = [
    { id: "1", email: "sergio@gmail.com", pass: "1212", nome: "Sérgio", }
];

const secretToken = 'tokensergio'; //chave de assinatura

app.post('/login', (req, res) => {
    const { email, pass } = req.body;

    //validariam o user
    const user = userDB.find(u => u.email === email && u.pass == pass);
    if (!user)

        return res.status(401).json(erro + 'Dados invalidos');
    //gerar o token (JWT), com o id, nome do user e a valid(1 hora)
    //sign(dados, assinatura, validade)
    const token = jwt.sign({ userId: user.id, nome: user.nome },
        secretToken, { expiresIn: '1h' });

    res.json({ token });
});

app.listen(4000, () => {
    console.log("Servidor na porta 4000");
})