import * as fromPriceQuery from './price-query.reducer';
import * as fromActions from './price-query.actions';

describe('PriceQueryReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPriceQuery;
      const action = {
        type: Symbol
      } as any;
      const state = fromPriceQuery.priceQueryReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('PriceQueryFetched action', () => {
    it('should get the results', () => {
      const mockDateData = require('../../../../mockData/mockDateData.json');
      const mockStateData = require('../../../../mockData/mockStateData.json');
      const { initialState } = fromPriceQuery;
      const action = new fromActions.PriceQueryFetched(mockDateData);
      const state = fromPriceQuery.priceQueryReducer(initialState, action);

      expect(state).toEqual(mockStateData);
    });
  });

  describe('SelectSymbol action', () => {
    it('should add the symbol', () => {
      const { initialState } = fromPriceQuery;
      const symbol = 'AAPL';
      const stateData = {
        selectedSymbol: symbol,
        ids: [],
        entities: {}
      } as any;

      const action = new fromActions.SelectSymbol(symbol);
      const state = fromPriceQuery.priceQueryReducer(initialState, action);

      expect(state).toEqual(stateData);
    });
  });
});
