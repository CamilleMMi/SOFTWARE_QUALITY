const express = require('express');
const router = express.Router();
const Joueur = require('../models/joueurModel');

router.post('/', async (req, res) => {
    try {
        const joueur = new Joueur(req.body);
        await joueur.save();
        res.status(201).send(joueur);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const joueurs = await Joueur.find();
        res.send(joueurs);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.params.id);
        if (!joueur) return res.status(404).send();
        res.send(joueur);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!joueur) return res.status(404).send();
        res.send(joueur);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findByIdAndDelete(req.params.id);
        if (!joueur) return res.status(404).send();
        res.send(joueur);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
