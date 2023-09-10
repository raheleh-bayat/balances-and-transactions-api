
import sinon from 'sinon';
import axios from 'axios';
import { getHistoricalBalance } from '../../src/services/getHistoricalBalances';

describe('getHistoricalBalance', () => {
    let axiosGetStub: any;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        axiosGetStub.restore();
    });

    it('should fetch transactions and calculate historical balance correctly', async () => {
        const mockResponse = {
            data: {
                transactions: [
                    { date: '2023-01-01', amount: 100, currency: 'EUR', status: 'SUCCESS' },
                    { date: '2023-01-02', amount: 200, currency: 'EUR', status: 'SUCCESS' },
                    { date: '2023-01-03', amount: 200, currency: 'EUR', status: 'SUCCESS' },
                ],
            },
        };
        axiosGetStub.resolves(mockResponse);

        const fromDate = '2023-01-01';
        const toDate = '2023-01-03';
        const sort = 'asc';

        const result = await getHistoricalBalance(fromDate, toDate, sort);

        expect(axiosGetStub.calledOnce).toBe(true);
        expect(axiosGetStub.firstCall.args[0]).toBe('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions');

        const expectedBalances = [
            { date: '2023-01-01', amount: 100, currency: 'EUR' },
            { date: '2023-01-02', amount: 300, currency: 'EUR' },
            { date: '2023-01-03', amount: 500, currency: 'EUR' },
        ];
        expect(result).toEqual(expectedBalances);
    });
  it('should fetch transactions and calculate historical balance sort', async () => {
        const mockResponse = {
            data: {
                transactions: [
                    { date: '2023-01-01', amount: 100, currency: 'EUR', status: 'SUCCESS' },
                    { date: '2023-01-02', amount: 200, currency: 'EUR', status: 'SUCCESS' },
                    { date: '2023-01-03', amount: 200, currency: 'EUR', status: 'SUCCESS' },
                ],
            },
        };
        axiosGetStub.resolves(mockResponse);

        const fromDate = '2023-01-01';
        const toDate = '2023-01-03';

        const result = await getHistoricalBalance(fromDate, toDate, "asc");

        expect(axiosGetStub.calledOnce).toBe(true);
        expect(axiosGetStub.firstCall.args[0]).toBe('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions');

        const expectedBalances = [
            { date: '2023-01-01', amount: 100, currency: 'EUR' },
            { date: '2023-01-02', amount: 300, currency: 'EUR' },
            { date: '2023-01-03', amount: 500, currency: 'EUR' },
        ];
        expect(result).toEqual(expectedBalances);

        const result2 = await getHistoricalBalance(fromDate, toDate, "desc");

        expect(axiosGetStub.calledTwice).toBe(true);
        expect(axiosGetStub.firstCall.args[0]).toBe('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions');

        const expectedBalances2 = [
            { date: '2023-01-03', amount: 500, currency: 'EUR' },
            { date: '2023-01-02', amount: 300, currency: 'EUR' },
            { date: '2023-01-01', amount: 100, currency: 'EUR' },
        ];
      expect(result2).toEqual(expectedBalances2);
    });

});
