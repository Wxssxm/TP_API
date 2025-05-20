const verifyToken = require('../middlewares/verifyToken');
const validatePhoto = require('../middlewares/validatePhoto');
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const Album = require('../models/Album');


router.post('/album/:idalbum/photo', verifyToken, validatePhoto, async (req, res) => {
  try {
    const album = await Album.findById(req.params.idalbum);
    if (!album) return res.status(404).json({ message: 'Album non trouvé' });

    const photo = new Photo({
      ...req.body,
      album: album._id
    });

    await photo.save();

    album.photos.push(photo._id);
    await album.save();

    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/album/:idalbum/photos', async (req, res) => {
  try {
    const photos = await Photo.find({ album: req.params.idalbum });
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/album/:idalbum/photo/:idphotos', async (req, res) => {
  try {
    const photo = await Photo.findOne({
      _id: req.params.idphotos,
      album: req.params.idalbum
    });

    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/album/:idalbum/photo/:idphotos', verifyToken, validatePhoto, async (req, res) => {
  try {
    const photo = await Photo.findOneAndUpdate(
      { _id: req.params.idphotos, album: req.params.idalbum },
      req.body,
      { new: true }
    );

    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/album/:idalbum/photo/:idphotos', verifyToken, async (req, res) => {
  try {
    const photo = await Photo.findOneAndDelete({
      _id: req.params.idphotos,
      album: req.params.idalbum
    });

    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });

    // Retirer la référence de l'album
    await Album.findByIdAndUpdate(req.params.idalbum, {
      $pull: { photos: photo._id }
    });

    res.status(200).json({ message: 'Photo supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;