const express = require('express');
const mongoose = require('mongoose');
const albumRoutes = require('./routes/album.routes');
const photoRoutes = require('./routes/photo.routes');
const authRoutes = require('./routes/auth.routes');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/albumdb')
  .then(() => console.log(' Connecté à MongoDB'))
  .catch(err => {
    console.error(' Erreur MongoDB :', err.message);
    process.exit(1);
  });


app.use('/api', albumRoutes);
app.use('/api', photoRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); 

  res.status(500).json({
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});