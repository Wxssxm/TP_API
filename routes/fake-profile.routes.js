const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/fake-profile', async (req, res) => {
  try {
    const [
      userRes,
      randommerRes,
      pokemonRes,
      jokeRes
    ] = await Promise.all([
      axios.get('http://localhost:3000/api/random-user'),
      axios.get('http://localhost:3000/api/randommer-data'),
      axios.get('http://localhost:3000/api/random-pokemon'),
      axios.get('http://localhost:3000/api/random-joke')
    ]);

    const fakeProfile = {
      user: userRes.data,
      phone_number: randommerRes.data.phone_number,
      iban: randommerRes.data.iban,
      credit_card: randommerRes.data.credit_card,
      pokemon: pokemonRes.data.pokemon,
      joke: jokeRes.data.joke
    };

    res.json(fakeProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur lors de l\'agrégation des données.' });
  }
});

module.exports = router;