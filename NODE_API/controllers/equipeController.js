const express = require('express');
const router = express.Router();
const Equipe = require('../models/equipeModel');

router.post('/', async (req, res) => {
    try {
        const equipe = new Equipe(req.body);
        await equipe.save();
        res.status(201).send(equipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const equipes = await Equipe.find().populate('joueurs capitaine');
        res.send(equipes);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id).populate('joueurs capitaine');
        if (!equipe) return res.status(404).send();
        res.send(equipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!equipe) return res.status(404).send();
        res.send(equipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findByIdAndDelete(req.params.id);
        if (!equipe) return res.status(404).send();
        res.send(equipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
