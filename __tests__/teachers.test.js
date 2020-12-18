const supertest = require('supertest');
const connection = require('../src/database');
const app = require('../src/app');

afterAll( () => {
    connection.end();
});

describe('GET /api/teachers/list', () => {
    it(' Should return 200 for all requests', async () => {

        const response = await supertest(app).get('/api/teachers/list');
        expect(response.status).toBe(200);
    });
});

describe('GET /api/teachers/:id/subjects', () => {
    it(' Should return 422 if teacher id is not valid', async () => {

        const response = await supertest(app).get('/api/teachers/33/subjects');
        expect(response.status).toBe(422);
    });

    it(' Should return 200 for a valid request', async () => {

        const response = await supertest(app).get('/api/teachers/13/subjects');
        expect(response.status).toBe(200);
    });
});