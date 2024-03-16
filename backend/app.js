require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// Données simulées pour les utilisateurs
let users = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
];

app.get('/api/users', (_, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send({ error: 'Utilisateur non trouvé' });
    res.send(user);
});

app.post('/api/users', (req, res) => {
    const { name, username } = req.body;
    const user = { id: users.length + 1, name, username };
    users.push(user);
    res.status(201).send(user);
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, username } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send({ error: 'Utilisateur non trouvé' });
    user.name = name;
    user.username = username;
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).send({ error: 'Utilisateur non trouvé' });
    const [deletedUser] = users.splice(index, 1);
    res.send(deletedUser);
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port : ${PORT}`);
});
