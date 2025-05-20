const express = require('express');
const axios = require('axios');
const router = express.Router();

const headers = {
  headers: { 'X-Api-Key': process.env.RANDOMMER_API_KEY }
};

router.get('/randommer-data', async (req, res) => {
  try {
    const [phoneRes, ibanRes, cardRes] = await Promise.all([
      axios.get('https://randommer.io/api/Phone/Generate?CountryCode=FR&Quantity=1', headers),
      axios.get('https://randommer.io/api/Finance/Iban/FR', headers),
      axios.get('https://randommer.io/api/Card', headers)
    ]);

    const creditCard = {
      card_number: cardRes.data.cardNumber,
      card_type: cardRes.data.type,
      expiration_date: cardRes.data.date.split('T')[0],
      cvv: cardRes.data.cvv
    };

    res.json({
      phone_number: phoneRes.data[0],
      iban: ibanRes.data,
      credit_card: creditCard
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de l’appel à Randommer.io' });
  }
});

module.exports = router;