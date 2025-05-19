# API Album Photos

Une API RESTful pour gérer des albums photos, construite avec Express.js et MongoDB.

## Prérequis

- Node.js
- MongoDB

## Installation

```bash
# Installer les dépendances
npm install

# Démarrer MongoDB
brew services start mongodb-community

# Lancer l'application
node app.js
```

L'API sera disponible sur `http://localhost:3000/api`

## Modèles de données

### Album
- `title`: String (requis)
- `description`: String
- `photos`: Array of Photo IDs
- `created_at`: Date

### Photo
- `title`: String (requis)
- `url`: String (requis)
- `description`: String
- `created_at`: Date
- `album`: Album ID (requis)

## Endpoints

### Albums

- `GET /api/albums` - Récupérer tous les albums
- `GET /api/albums?title=texte` - Rechercher des albums par titre
- `GET /api/album/:id` - Récupérer un album par ID
- `POST /api/album` - Créer un nouvel album
- `PUT /api/album/:id` - Mettre à jour un album
- `DELETE /api/album/:id` - Supprimer un album

### Photos

- `GET /api/album/:idalbum/photos` - Récupérer toutes les photos d'un album
- `GET /api/album/:idalbum/photo/:idphotos` - Récupérer une photo spécifique
- `POST /api/album/:idalbum/photo` - Ajouter une photo à un album
- `PUT /api/album/:idalbum/photo/:idphotos` - Mettre à jour une photo
- `DELETE /api/album/:idalbum/photo/:idphotos` - Supprimer une photo