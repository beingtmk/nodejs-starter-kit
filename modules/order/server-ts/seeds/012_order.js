import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import STATES from '../constants/order_states';

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, ['order', 'order_detail']);
  // Orders for Admin

  // Order STALE
  // Table: order
  const order_stale = await returnId(knex('order')).insert({
    consumer_id: 1,
    vendor_id: 1,
    state: STATES.STALE
  });

  // 2 items in cart
  await Promise.all(
    [...Array(1).keys()].map(async i => {
      // Table: order_detail
      await returnId(knex('order_detail')).insert({
        order_id: order_stale[0],
        cost: 1234,
        quantity: 5,
        title: 'some listing',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU',
        date: '14 march'
      });
    })
  );

  // Order INITIATED
  // Table: order
  const order_initiated = await returnId(knex('order')).insert({
    consumer_id: 1,
    vendor_id: 1,
    state: STATES.INITIATED
  });

  // 2 items in INITIATED
  await Promise.all(
    [...Array(4).keys()].map(async i => {
      // Table: order_detail
      await returnId(knex('order_detail')).insert({
        order_id: order_initiated[0],
        cost: 1234,
        quantity: 5,
        title: 'some listing',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU',
        date: '14 march'
      });
    })
  );
}
