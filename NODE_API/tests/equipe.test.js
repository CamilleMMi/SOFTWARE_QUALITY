const request = require('supertest');
const app = require('../app');
const Equipe = require('../models/equipe');
const Joueur = require('../models/joueur');
const mongoose = require('mongoose');

describe('Tests API pour les équipes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait créer une nouvelle équipe', async () => {
        const capitaine = new Joueur({
            id_joueur: 'J123',
            nom_joueur: 'Doe',
            prenom_joueur: 'John',
            pseudo: 'johndoe',
            email: 'john.doe@example.com'
        });
        await capitaine.save();

        const res = await request(app)
            .post('/api/equipes')
            .send({
                id_equipe: 'E123',
                nom_equipe: 'Team Alpha',
                capitaine: capitaine._id
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('nom_equipe', 'Team Alpha');
    });

    it('devrait récupérer toutes les équipes', async () => {
        const res = await request(app).get('/api/equipes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('devrait récupérer une équipe par son ID', async () => {
        const capitaine = new Joueur({
            id_joueur: 'J456',
            nom_joueur: 'Smith',
            prenom_joueur: 'Jane',
            pseudo: 'janesmith',
            email: 'jane.smith@example.com'
        });
        await capitaine.save();

        const equipe = new Equipe({
            id_equipe: 'E456',
            nom_equipe: 'Team Beta',
            capitaine: capitaine._id
        });
        await equipe.save();

        const res = await request(app).get(`/api/equipes/${equipe._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nom_equipe', 'Team Beta');
    });

    it('devrait mettre à jour une équipe', async () => {
        const capitaine = new Joueur({
            id_joueur: 'J789',
            nom_joueur: 'Brown',
            prenom_joueur: 'Bob',
            pseudo: 'bobbrown',
            email: 'bob.brown@example.com'
        });
        await capitaine.save();

        const equipe = new Equipe({
            id_equipe: 'E789',
            nom_equipe: 'Team Gamma',
            capitaine: capitaine._id
        });
        await equipe.save();

        const res = await request(app)
            .put(`/api/equipes/${equipe._id}`)
            .send({ nom_equipe: 'Team Gamma Updated' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nom_equipe', 'Team Gamma Updated');
    });

    it('devrait supprimer une équipe', async () => {
        const capitaine = new Joueur({
            id_joueur: 'J999',
            nom_joueur: 'Johnson',
            prenom_joueur: 'Michael',
            pseudo: 'michaeljohnson',
            email: 'michael.johnson@example.com'
        });
        await capitaine.save();

        const equipe = new Equipe({
            id_equipe: 'E999',
            nom_equipe: 'Team Delta',
            capitaine: capitaine._id
        });
        await equipe.save();

        const res = await request(app).delete(`/api/equipes/${equipe._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Équipe supprimée avec succès');
    });
});
