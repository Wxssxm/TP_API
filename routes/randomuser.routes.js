const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/random-user', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];

    const formattedUser = {
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      gender: user.gender,
      location: `${user.location.city}, ${user.location.country}`,
      picture: user.picture.large
    };

    res.status(200).json({ user: formattedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
});

module.exports = router;