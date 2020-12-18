const supertest = require('supertest');
const connection = require('../src/database');
const app = require('../src/app');

async function cleanDB () {
    connection.query('DELETE FROM exams');
}

//beforeAll(cleanDB);
afterAll( async () => {
    //await cleanDB();
    connection.end();
});

describe('POST /api/exams/:teacherId/:subjectId', () => {
    it(' Should return 422 when exam is posted with empty url', async () => {
        const body = {
            name: '2018.1',
            url: '',
            type: 'P1'
        }

        const response = await supertest(app).post('/api/exams/4/44').send(body);
        expect(response.status).toBe(422);
    });

    it(' Should return 422 when subjectId is not valid', async () => {
        const body = {
            name: '2018.1',
            url: 'https://www.notion.so/Links-p-blicos-0567685b5d9247a0aa3eaae576995aac',
            type: 'P1'
        }

        const response = await supertest(app).post('/api/exams/4/60').send(body);
        expect(response.status).toBe(422);
    });

    it(' Should return 201 when nothing is missing', async () => {
        const body = {
            name: '2018.1',
            url: 'https://www.notion.so/Links-p-blicos-0567685b5d9247a0aa3eaae576995aac',
            type: 'P1'
        }

        const response = await supertest(app).post('/api/exams/4/10').send(body);
        expect(response.status).toBe(201);
    });
});