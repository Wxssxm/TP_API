const express = require('express');
const axios = require('axios');
const router = express.Router();

// On utilise l'API PokeAPI
router.get('/random-pokemon', async (req, res) => {
  try {
    // Il y a environ 898 Pokémon connus
    const randomId = Math.floor(Math.random() * 898) + 1;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemonName = response.data.name;

    res.json({ pokemon: pokemonName });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération du Pokémon.' });
  }
});

module.exports = router;