import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}

export function dateRangedPriceQueryResponse(
  response: PriceQueryResponse[],
  periodFromDate: Date,
  periodToDate: Date
): PriceQueryResponse[] {
  return response.filter(priceQuery => {
    const allReturnedDates = parse(priceQuery.date);
    return (
      allReturnedDates >= periodFromDate && allReturnedDates <= periodToDate
    );
  });
}
