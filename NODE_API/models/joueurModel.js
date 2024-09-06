const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
    id_joueur: { type: String, required: true, unique: true },
    nom_joueur: { type: String, required: true },
    prenom_joueur: { type: String, required: true },
    pseudo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String }
}, { timestamps: true });

const Joueur = mongoose.model('Joueur', joueurSchema);
module.exports = Joueur;
