// servidor.js

const express = require('express');
const db = require('./database');

(async () => {
  const team1 = await db.selectTeam1();
  const team2 = await db.selectTeam2();
  const confronto = await db.selectConfronto();

  const app = express();
  const PORT = 1214;

  app.use(express.json());

  app.get('/team1', (req, res) => {
    res.json(team1);
  });

  app.get('/team2', (req, res) => {
    res.json(team2);
  });

  app.get('/confronto', (req, res) => {
    res.json(confronto);
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
})();
