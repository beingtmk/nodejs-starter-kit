import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { MODAL } from '@gqlapp/review-common';

function randomDateTime(start, end) {
  const diff = end.getTime() - start.getTime();
  const new_diff = diff * Math.random();
  const date = new Date(start.getTime() + new_diff);
  return date;
}

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['discount', 'discount_duration']);

  await Promise.all(
    [...Array(100).keys()].map(async ii => {
      const isDiscount = Math.random() < 0.6 ? false : true;
      if (isDiscount) {
        const discount = await returnId(knex('discount')).insert({
          modal_name: MODAL[1].value,
          modal_id: ii + 1,
          discount_percent: isDiscount ? Math.floor(Math.random() * (60 - 1 + 1) + 1).toFixed(2) : 0
        });
        const isDiscountTimeStamp = isDiscount && Math.random() < 0.6 ? false : true;
        isDiscountTimeStamp &&
          (await returnId(knex('discount_duration')).insert({
            discount_id: discount[0],
            start_date: randomDateTime(new Date('10-10-2020 00:00'), new Date('6-30-2021 23:59')),
            end_date: randomDateTime(new Date('07-01-2021 00:00'), new Date('12-31-2021 23:59'))
          }));
      }
    })
  );
};
