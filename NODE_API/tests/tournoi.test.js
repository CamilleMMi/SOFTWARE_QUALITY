const request = require('supertest');
const app = require('../app');
const Tournoi = require('../models/tournoi');
const Evenement = require('../models/evenement');
const mongoose = require('mongoose');

describe('Tests API pour les tournois', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait créer un nouveau tournoi', async () => {
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
            .post('/api/tournois')
            .send({
                id_tournoi: 'T123',
                nom_tournoi: 'Championship',
                jeu: 'FIFA',
                plateforme: 'PC',
                type: 'Solo',
                id_evenement: evenement._id,
                date_inscription: '2024-08-01'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('nom_tournoi', 'Championship');
    });

    it('devrait récupérer tous les tournois', async () => {
        const res = await request(app).get('/api/tournois');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('devrait récupérer un tournoi par son ID', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT456',
            nom_evenement: 'Paris Gaming Show',
            date_debut: '2024-10-10',
            date_fin: '2024-10-12',
            lieu: 'Paris',
            description: 'Salon du jeu vidéo à Paris'
        });
        await evenement.save();

        const tournoi = new Tournoi({
            id_tournoi: 'T456',
            nom_tournoi: 'Grand Prix',
            jeu: 'League of Legends',
            plateforme: 'PC',
            type: 'Team',
            id_evenement: evenement._id,
            date_inscription: '2024-09-15'
        });
        await tournoi.save();

        const res = await request(app).get(`/api/tournois/${tournoi._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nom_tournoi', 'Grand Prix');
    });

    it('devrait mettre à jour un tournoi', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT789',
            nom_evenement: 'GameCon',
            date_debut: '2024-11-01',
            date_fin: '2024-11-03',
            lieu: 'Nice',
            description: 'Convention des gamers à Nice'
        });
        await evenement.save();

        const tournoi = new Tournoi({
            id_tournoi: 'T789',
            nom_tournoi: 'Final Battle',
            jeu: 'Dota 2',
            plateforme: 'PC',
            type: 'Solo',
            id_evenement: evenement._id
        });
        await tournoi.save();

        const res = await request(app)
            .put(`/api/tournois/${tournoi._id}`)
            .send({ nom_tournoi: 'Final Battle Updated' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nom_tournoi', 'Final Battle Updated');
    });

    it('devrait supprimer un tournoi', async () => {
        const evenement = new Evenement({
            id_evenement: 'EVT999',
            nom_evenement: 'Summer Fest',
            date_debut: '2024-12-01',
            date_fin: '2024-12-05',
            lieu: 'Marseille',
            description: 'Festival d\'été'
        });
        await evenement.save();

        const tournoi = new Tournoi({
            id_tournoi: 'T999',
            nom_tournoi: 'Summer Tournament',
            jeu: 'CS:GO',
            plateforme: 'PC',
            type: 'Team',
            id_evenement: evenement._id
        });
        await tournoi.save();

        const res = await request(app).delete(`/api/tournois/${tournoi._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Tournoi supprimé avec succès');
    });
});
