const request = require('supertest');
const app = require('../app');
const Evenement = require('../models/evenement');
const mongoose = require('mongoose');

describe('Tests API pour les événements', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait créer un nouvel événement', async () => {
        const res = await request(app)
            .post('/api/evenements')
            .send({
                id_evenement: 'EVT123',
                nom_evenement: 'Lyon eSport',
                date_debut: '2024-09-05',
                date_fin: '2024-09-07',
                lieu: 'Lyon',
                description: 'Un grand événement eSport'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('nom_evenement', 'Lyon eSport');
    });

    it('devrait récupérer tous les événements', async () => {
        const res = await request(app).get('/api/evenements');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('devrait récupérer un événement par son ID', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT456',
            nom_evenement: 'Paris Gaming Show',
            date_debut: '2024-10-10',
            date_fin: '2024-10-12',
            lieu: 'Paris',
            description: 'Salon du jeu vidéo à Paris'
        });
        await evenement.save();

        const res = await request(app).get(`/api/evenements/${evenement._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nom_evenement', 'Paris Gaming Show');
    });

    it('devrait supprimer un événement', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT789',
            nom_evenement: 'GameCon',
            date_debut: '2024-11-01',
            date_fin: '2024-11-03',
            lieu: 'Nice',
            description: 'Convention des gamers à Nice'
        });
        await evenement.save();

        const res = await request(app).delete(`/api/evenements/${evenement._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Événement supprimé avec succès');
    });
});
