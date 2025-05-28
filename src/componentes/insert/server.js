// server.js
const express = require('express');
const cors = require('cors');
const { insertAdmin } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contatos', async (req, res) => {
	const { email, pass } = req.body;

	try {
	  await insertAdmin(email, pass);
	  res.status(200).json({ message: 'Utilizador registado com sucesso!' });
	} catch (error) {
	  console.error("Erro ao registar:", error);
	  res.status(500).json({ error: 'Erro ao registar Utilizador' });
	}
  });
  

app.listen(5000, () => {
  console.log("Servidor na porta 5000");
});
