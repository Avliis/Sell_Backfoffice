// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.mhqwscd.mongodb.net/Peças?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;
const pecaSchema = new Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Peca = mongoose.model('peça', pecaSchema, 'Peças');

app.get('/pecas', async (req, res) => {
    const pecas = await Peca.find({});
    res.json(pecas);
});

const newPeca = new Peca({
    title: 'Primeira peça',
    content: 'Esta é a minha primeira peça. Yay!'
});

app.get('/addpeca', async (req, res) => {
    await newPeca.save();
    res.send('Peça adicionada!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});