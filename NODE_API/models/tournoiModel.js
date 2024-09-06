const mongoose = require('mongoose');

const tournoiSchema = new mongoose.Schema({
    id_tournoi: { type: String, required: true, unique: true },
    nom_tournoi: { type: String, required: true },
    jeu: { type: String, required: true },
    plateforme: { type: String, required: true },
    type: { type: String, required: true },
    id_evenement: { type: mongoose.Schema.Types.ObjectId, ref: 'Evenement', required: true },
    date_inscription: { type: Date },
    inscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inscription' }],
    resultats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resultat' }]
}, { timestamps: true });

const Tournoi = mongoose.model('Tournoi', tournoiSchema);
module.exports = Tournoi;
