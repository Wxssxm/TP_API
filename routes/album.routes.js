const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const verifyToken = require('../middlewares/verifyToken');
const validateAlbum = require('../middlewares/validateAlbum');

router.get('/albums', async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: 'i' }; 
    }
    const albums = await Album.find(filter).populate('photos');
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/album/:id', verifyToken, async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('photos');
        if (!album) return res.status(404).json({ message: 'Album non trouvé' });
        res.status(200).json(album);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  });



  router.post('/album', verifyToken, validateAlbum, async (req, res) => {
    try {
      const album = new Album(req.body);
      await album.save();
      res.status(201).json(album);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


router.put('/album/:id', verifyToken, validateAlbum, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) return res.status(404).json({ message: 'Album non trouvé' });
    res.status(200).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/album/:id', verifyToken, async (req, res) =>{
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album non trouvé' });
    res.status(200).json({ message: 'Album supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;