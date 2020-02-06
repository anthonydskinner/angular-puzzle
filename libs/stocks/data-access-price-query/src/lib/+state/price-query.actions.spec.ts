import {
  FetchPriceQuery,
  PriceQueryFetchError,
  PriceQueryFetched,
  SelectSymbol
} from './price-query.actions';

describe('FetchPriceQuery', () => {
  it('should create an action', () => {
    const periodFromDate = new Date('2020-01-27T06:00:00.000Z');
    const periodToDate = new Date('2020-01-27T06:00:00.000Z');
    const action = new FetchPriceQuery('AAPL', periodFromDate, periodToDate);

    expect({ ...action }).toEqual({
      type: '[Price Query] Fetch Price Query',
      symbol: 'AAPL',
      periodFromDate: periodFromDate,
      periodToDate: periodToDate
    });
  });
});

describe('PriceQueryFetchError', () => {
  it('should create an action', () => {
    const errorMsg = 'Error Message';
    const action = new PriceQueryFetchError(errorMsg);

    expect({ ...action }).toEqual({
      type: '[Price Query] Price Query Fetch Error',
      error: errorMsg
    });
  });
});

describe('PriceQueryFetched', () => {
  it('should create an action', () => {
    const mockDateData = require('../../../../mockData/mockDateData.json');
    const action = new PriceQueryFetched(mockDateData);

    expect({ ...action }).toEqual({
      type: '[Price Query] Price Query Fetched',
      queryResults: mockDateData
    });
  });
});

describe('SelectSymbol', () => {
  it('should create an action', () => {
    const selectedSymbol = 'AAPL';
    const action = new SelectSymbol(selectedSymbol);

    expect({ ...action }).toEqual({
      type: '[Price Query] Select Symbol',
      symbol: selectedSymbol
    });
  });
});
