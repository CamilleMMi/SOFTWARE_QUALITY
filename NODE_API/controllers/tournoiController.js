const express = require('express');
const router = express.Router();
const Tournoi = require('../models/tournoiModel');

router.post('/', async (req, res) => {
    try {
        const tournoi = new Tournoi(req.body);
        await tournoi.save();
        res.status(201).send(tournoi);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const tournois = await Tournoi.find().populate('id_evenement');
        res.send(tournois);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tournoi = await Tournoi.findById(req.params.id).populate('id_evenement');
        if (!tournoi) return res.status(404).send();
        res.send(tournoi);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const tournoi = await Tournoi.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tournoi) return res.status(404).send();
        res.send(tournoi);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const tournoi = await Tournoi.findByIdAndDelete(req.params.id);
        if (!tournoi) return res.status(404).send();
        res.send(tournoi);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
