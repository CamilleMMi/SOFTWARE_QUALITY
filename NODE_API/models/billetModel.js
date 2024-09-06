const mongoose = require('mongoose');

const billetSchema = new mongoose.Schema({
    id_billet: { type: String, required: true, unique: true },
    id_evenement: { type: mongoose.Schema.Types.ObjectId, ref: 'Evenement', required: true },
    id_client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date_achat: { type: Date, default: Date.now }
}, { timestamps: true });

const Billet = mongoose.model('Billet', billetSchema);
module.exports = Billet;
