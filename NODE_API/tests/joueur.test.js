const request = require('supertest');
const app = require('../app');
const Joueur = require('../models/joueur');
const mongoose = require('mongoose');

describe('Tests API pour les joueurs', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait créer un nouveau joueur', async () => {
        const res = await request(app)
            .post('/api/joueurs')
            .send({
                id_joueur: 'J123',
                nom_joueur: 'Doe',
                prenom_joueur: 'John',
                pseudo: 'johndoe',
                email: 'john.doe@example.com'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('nom_joueur', 'Doe');
    });

    it('devrait récupérer tous les joueurs', async () => {
        const res = await request(app).get('/api/joueurs');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('devrait récupérer un joueur par son ID', async () => {
        const joueur = new Joueur({
            id_joueur: 'J456',
            nom_joueur: 'Smith',
            prenom_joueur: 'Jane',
            pseudo: 'janesmith',
            email: 'jane.smith@example.com'
        });
        await joueur.save();

        const res = await request(app).get(`/api/joueurs/${joueur._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('pseudo', 'janesmith');
    });

    it('devrait mettre à jour un joueur', async () => {
        const joueur = new Joueur({
            id_joueur: 'J789',
            nom_joueur: 'Brown',
            prenom_joueur: 'Bob',
            pseudo: 'bobbrown',
            email: 'bob.brown@example.com'
        });
        await joueur.save();

        const res = await request(app)
            .put(`/api/joueurs/${joueur._id}`)
            .send({ pseudo: 'bobbybrown' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('pseudo', 'bobbybrown');
    });

    it('devrait supprimer un joueur', async () => {
        const joueur = new Joueur({
            id_joueur: 'J999',
            nom_joueur: 'Johnson',
            prenom_joueur: 'Michael',
            pseudo: 'michaeljohnson',
            email: 'michael.johnson@example.com'
        });
        await joueur.save();

        const res = await request(app).delete(`/api/joueurs/${joueur._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Joueur supprimé avec succès');
    });
});
