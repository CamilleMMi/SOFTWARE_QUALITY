const Billet = require('../models/billetModel');

// Créer un billet
exports.createBillet = async (req, res) => {
    try {
        const billet = new Billet(req.body);
        await billet.save();
        res.status(201).send(billet);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Récupérer tous les billets
exports.getAllBillets = async (req, res) => {
    try {
        const billets = await Billet.find();
        res.send(billets);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Récupérer un billet par ID
exports.getBilletById = async (req, res) => {
    try {
        const billet = await Billet.findById(req.params.id);
        if (!billet) {
            return res.status(404).send();
        }
        res.send(billet);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour un billet
exports.updateBillet = async (req, res) => {
    try {
        const billet = await Billet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!billet) {
            return res.status(404).send();
        }
        res.send(billet);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Supprimer un billet
exports.deleteBillet = async (req, res) => {
    try {
        const billet = await Billet.findByIdAndDelete(req.params.id);
        if (!billet) {
            return res.status(404).send();
        }
        res.send(billet);
    } catch (error) {
        res.status(500).send(error);
    }
};
