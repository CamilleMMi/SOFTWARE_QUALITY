const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
    id_evenement: { type: String, required: true, unique: true },
    nom_evenement: { type: String, required: true },
    date_debut: { type: Date, required: true },
    date_fin: { type: Date, required: true },
    lieu: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

const Evenement = mongoose.model('Evenement', evenementSchema);
module.exports = Evenement;
