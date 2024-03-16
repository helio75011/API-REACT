// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importation de la bibliothèque Express
const express = require('express');

// Définition du port sur lequel le serveur doit écouter, avec une valeur par défaut de 5000 si non spécifiée dans les variables d'environnement
const PORT = process.env.PORT || 5000;

// Création d'une application Express
const app = express();
// Middleware pour analyser les corps JSON dans les requêtes
app.use(express.json());


// Données simulées pour démontrer l'utilisation d'une base de données
let data = [
    { id: 1, message: 'Hello World!' }
];


// Gestionnaire de route pour une requête GET sur '/api/test' pour retourner un simple message
app.get('/api/test', (_, res) => {
    res.send({ msg: 'Bonjour les amis !' });
});


// GET par ID : Recherche et retourne un élément par son ID depuis les données simulées
app.get('/api/data/:id', (req, res) => {
    // Extraction du paramètre id de l'URL de la requête
    const { id } = req.params;
    // Recherche de l'élément dans le tableau data avec l'ID correspondant
    const item = data.find(d => d.id === parseInt(id));
    // Si l'élément n'est pas trouvé, retourne une réponse 404 (Non Trouvé)
    if (!item) return res.status(404).send({ error: 'Élément non trouvé' });
    // Envoie de l'élément trouvé comme réponse
    res.send(item);
});


// POST : Ajoute un nouvel élément aux données simulées
app.post('/api/data', (req, res) => {
    // Extraction du message du corps de la requête
    const { message } = req.body;
    // Création d'un nouvel élément avec un ID unique et le message fourni
    const newItem = { id: data.length + 1, message };
    // Ajout du nouvel élément au tableau data
    data.push(newItem);
    // Retour du nouvel élément avec un statut 201 (Créé)
    res.status(201).send(newItem);
});


// PATCH : Met à jour le message d'un élément existant par son ID
app.patch('/api/data/:id', (req, res) => {
    // Extraction du paramètre id de l'URL de la requête
    const { id } = req.params;
    // Extraction du message du corps de la requête
    const { message } = req.body;
    // Recherche de l'élément dans le tableau data avec l'ID correspondant
    const item = data.find(d => d.id === parseInt(id));
    // Si l'élément n'est pas trouvé, retourne une réponse 404 (Non Trouvé)
    if (!item) return res.status(404).send({ error: 'Élément non trouvé' });
    // Mise à jour du message de l'élément
    item.message = message;
    // Envoie de l'élément mis à jour comme réponse
    res.send(item);
});


// DELETE : Supprime un élément par son ID des données simulées
app.delete('/api/data/:id', (req, res) => {
    // Extraction du paramètre id de l'URL de la requête
    const { id } = req.params;
    // Recherche de l'index de l'élément dans le tableau data
    const index = data.findIndex(d => d.id === parseInt(id));
    // Si l'élément n'est pas trouvé, retourne une réponse 404 (Non Trouvé)
    if (index === -1) return res.status(404).send({ error: 'Élément non trouvé' });
    // Suppression de l'élément du tableau data et stockage de l'élément supprimé
    const [deletedItem] = data.splice(index, 1);
    // Envoie de l'élément supprimé comme réponse
    res.send(deletedItem);
});


// Démarrage du serveur Express sur le PORT défini
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port : ${PORT}`);
});
