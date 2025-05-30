// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { findAdminByEmailAndPass } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const secretToken = 'tokensergio';

app.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  console.log(`Tentativa de login: ${email}`);

  try {
    const user = await findAdminByEmailAndPass(email, pass);

    if (!user) {
      console.log("Utilizador ou pass inválida");
      return res.status(401).json({ erro: 'Dados inválidos!' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secretToken,
      { expiresIn: '1h' }
    );

    console.log("Login bem-sucedido");
    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

app.listen(4000, () => {
  console.log("Servidor de login a correr na porta 4000");
});
