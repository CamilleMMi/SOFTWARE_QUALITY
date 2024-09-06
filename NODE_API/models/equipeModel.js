const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
    id_equipe: { type: String, required: true, unique: true },
    nom_equipe: { type: String, required: true },
    capitaine: { type: mongoose.Schema.Types.ObjectId, ref: 'Joueur', required: true },
    joueurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Joueur' }]
}, { timestamps: true });

const Equipe = mongoose.model('Equipe', equipeSchema);
module.exports = Equipe;
