const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; 

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d’utilisateur et mot de passe requis.' });
  }
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: 'Utilisateur déjà existant.' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'Utilisateur enregistré.' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;