/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';
import CatboxMemory from '@hapi/catbox-memory';
import req from 'request';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    cache: [
      {
        name: 'stock-cache',
        provider: {
          constructor: CatboxMemory,
          options: {
            partition: 'stock-cache-data'
          }
        }
      }
    ]
  });

  const fetchStocks = async symbol => {
    return new Promise((resolve, reject) => {
      const url = `${environment.apiURL}/beta/stock/${
        symbol.id
      }/chart/max?token=${environment.apiKey}`;
      req(url, (err, response, body) => {
        if (response && response.statusCode === 200) {
          resolve(body);
        }
      });
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

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
