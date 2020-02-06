import {
  transformPriceQueryResponse,
  dateRangedPriceQueryResponse
} from './price-query-transformer.util';

const mockDateData = require('../../../../mockData/mockDateData.json');

describe('Price Query Transformer Utilities', () => {
  it('should transform price query', () => {
    const resp = transformPriceQueryResponse(mockDateData);

    expect(resp).toStrictEqual([
      {
        date: '2020-01-27',
        open: 313.5,
        high: 314.55,
        low: 313.3,
        close: 311.79,
        volume: 40938304,
        change: -9.53,
        changePercent: -3.0727,
        label: 'Jan 27, 20',
        changeOverTime: 1.648541,
        dateNumeric: 1580104800000
      }
    ]);
  });

  it('should return valid data if date is in range', () => {
    const periodFromDate = new Date('2020-01-27T06:00:00.000Z');
    const periodToDate = new Date('2020-01-27T06:00:00.000Z');
    const resp = dateRangedPriceQueryResponse(
      mockDateData,
      periodFromDate,
      periodToDate
    );

    expect(resp).toStrictEqual([
      {
        date: '2020-01-27',
        uClose: 323.92,
        uOpen: 324.94,
        uHigh: 314.18,
        uLow: 314.85,
        uVolume: 41585558,
        close: 311.79,
        open: 313.5,
        high: 314.55,
        low: 313.3,
        volume: 40938304,
        change: -9.53,
        changePercent: -3.0727,
        label: 'Jan 27, 20',
        changeOverTime: 1.648541
      }
    ]);
  });
});
