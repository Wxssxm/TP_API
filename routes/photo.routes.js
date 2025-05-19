const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const Album = require('../models/Album');

// POST /album/:idalbum/photo – Ajouter une photo à un album
router.post('/album/:idalbum/photo', async (req, res) => {
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

// GET /album/:idalbum/photos – Liste des photos d’un album
router.get('/album/:idalbum/photos', async (req, res) => {
  try {
    const photos = await Photo.find({ album: req.params.idalbum });
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /album/:idalbum/photo/:idphotos – Une photo spécifique
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

// PUT /album/:idalbum/photo/:idphotos – Modifier une photo
router.put('/album/:idalbum/photo/:idphotos', async (req, res) => {
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

// DELETE /album/:idalbum/photo/:idphotos – Supprimer une photo
router.delete('/album/:idalbum/photo/:idphotos', async (req, res) => {
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