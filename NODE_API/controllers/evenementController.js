const express = require('express');
const router = express.Router();
const Evenement = require('../models/evenementModel');

router.post('/', async (req, res) => {
    try {
        const evenement = new Evenement(req.body);
        await evenement.save();
        res.status(201).send(evenement);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const evenements = await Evenement.find();
        res.send(evenements);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const evenement = await Evenement.findById(req.params.id);
        if (!evenement) return res.status(404).send();
        res.send(evenement);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const evenement = await Evenement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!evenement) return res.status(404).send();
        res.send(evenement);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const evenement = await Evenement.findByIdAndDelete(req.params.id);
        if (!evenement) return res.status(404).send();
        res.send(evenement);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
