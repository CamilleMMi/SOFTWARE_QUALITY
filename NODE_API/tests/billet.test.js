const request = require('supertest');
const app = require('../app');
const Billet = require('../models/billet');
const Evenement = require('../models/evenement');
const mongoose = require('mongoose');

describe('Tests API pour les billets', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait créer un nouveau billet', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT123',
            nom_evenement: 'Lyon eSport',
            date_debut: '2024-09-05',
            date_fin: '2024-09-07',
            lieu: 'Lyon',
            description: 'Un grand événement eSport'
        });
        await evenement.save();

        const res = await request(app)
            .post('/api/billets')
            .send({
                id_billet: 'B123',
                id_evenement: evenement._id,
                id_client: 'C123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id_billet', 'B123');
    });

    it('devrait récupérer tous les billets', async () => {
        const res = await request(app).get('/api/billets');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('devrait récupérer un billet par son ID', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT456',
            nom_evenement: 'Paris Gaming Show',
            date_debut: '2024-10-10',
            date_fin: '2024-10-12',
            lieu: 'Paris',
            description: 'Salon du jeu vidéo à Paris'
        });
        await evenement.save();

        const billet = new Billet({
            id_billet: 'B456',
            id_evenement: evenement._id,
            id_client: 'C456'
        });
        await billet.save();

        const res = await request(app).get(`/api/billets/${billet._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_billet', 'B456');
    });

    it('devrait mettre à jour un billet', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT789',
            nom_evenement: 'GameCon',
            date_debut: '2024-11-01',
            date_fin: '2024-11-03',
            lieu: 'Nice',
            description: 'Convention des gamers à Nice'
        });
        await evenement.save();

        const billet = new Billet({
            id_billet: 'B789',
            id_evenement: evenement._id,
            id_client: 'C789'
        });
        await billet.save();

        const res = await request(app)
            .put(`/api/billets/${billet._id}`)
            .send({ id_client: 'C789Updated' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_client', 'C789Updated');
    });

    it('devrait supprimer un billet', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT999',
            nom_evenement: 'Summer Fest',
            date_debut: '2024-12-01',
            date_fin: '2024-12-05',
            lieu: 'Marseille',
            description: 'Festival d\'été'
        });
        await evenement.save();

        const billet = new Billet({
            id_billet: 'B999',
            id_evenement: evenement._id,
            id_client: 'C999'
        });
        await billet.save();

        const res = await request(app).delete(`/api/billets/${billet._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Billet supprimé avec succès');
    });
});
