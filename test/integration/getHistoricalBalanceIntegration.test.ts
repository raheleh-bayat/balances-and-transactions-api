import request from 'supertest';
import { getHistoricalBalance } from "../../src/services/getHistoricalBalances";
import app from "../../src/app";

describe('GET /historical-balance', () => {
    it('should return the historical balance data', async () => {
        const response = await request(app)
            .get('/historical-balances')
            .set('x-api-key', "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18")
            .query({ from: '2022-01-01', to: '2022-01-02', sort: 'asc' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{"date":"2022-01-01","amount":-1379,"currency":"EUR"},{"date":"2022-01-02","amount":-401,"currency":"EUR"}]);
    });

    it('should return Unauthorized error when call with no x-api-key', async () => {
        const response = await request(app)
            .get('/historical-balances')
            .query({ from: '2022-01-01', to: '2022-01-02', sort: 'asc' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ "error": "Unauthorized" });
    });

    it('should return error when invalid query params', async () => {
        const response = await request(app)
            .get('/historical-balances')
            .set('x-api-key', "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18")
            .query({ from: '2022-', to: '2022-01-02', sort: 'asc' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ "error": "Invalid parameter format: from" });
    });
});
