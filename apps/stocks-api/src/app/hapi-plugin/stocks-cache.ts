import { environment } from '../../environments/environment';
import CatboxMemory from '@hapi/catbox-memory';
import fetch from 'node-fetch';

export const StocksCachePlugin = {
  name: 'stocks-cache-plugin',
  version: '1.0.0',
  register: async (server) => {

    server.cache.provision({
      name: 'stock-cache',
      provider: {
        constructor: CatboxMemory,
        options: {
          partition: 'stock-cache-data'
        }
      }
    });
    
    const fetchStocks = async symbol => {
      const url = `${environment.apiURL}/beta/stock/${
        symbol.id
      }/chart/max?token=${environment.apiKey}`;

      return await fetch(url)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          return error;
        });
    };

    const stocksCache = server.cache({
      cache: 'stock-cache',
      expiresIn: 10 * 1000,
      segment: 'stocksSegment',
      generateFunc: async id => {
        return await fetchStocks(id);
      },
      generateTimeout: 2000
    });

    server.route({
      method: 'GET',
      path: '/api/beta/stock/{symbol}/chart/max',
      handler: async (request, h) => {
        const symbol = request.params.symbol;
        const id = `${symbol}`;
        return await stocksCache.get({ id });
      }
    });
  }
};
