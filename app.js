const express = require('express');
const mongoose = require('mongoose');
const albumRoutes = require('./routes/album.routes');
const photoRoutes = require('./routes/photo.routes');

const app = express();


app.use(express.json());


mongoose.connect('mongodb://localhost:27017/albumdb')
  .then(() => console.log(' Connecté à MongoDB'))
  .catch(err => {
    console.error(' Erreur MongoDB :', err.message);
    process.exit(1);
  });


app.use('/api', albumRoutes);
app.use('/api', photoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});
