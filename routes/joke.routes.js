const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/random-joke', async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=single');
    
    const joke = {
      type: response.data.category,
      content: response.data.joke
    };

    res.json({ joke });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération de la blague.' });
  }
});

module.exports = router;