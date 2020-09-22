import { returnId, truncateTables } from '@gqlapp/database-server-ts';

import { ORDER_STATES } from '@gqlapp/order-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['order', 'order_state', 'order_detail', 'order_option']);

  // Order STALE
  await Promise.all(
    [...Array(1).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        consumer_id: 1,
        vendor_id: 1,
        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });
      await returnId(knex('order_state')).insert({
        order_id: order[0]
      });
      const orderDetail = await returnId(knex('order_detail')).insert({
        order_id: order[0],

        modal_name: 'listing',
        modal_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),

        image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
        title: 'Listing',
        cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
      });
      await returnId(knex('order_option')).insert({
        order_detail_id: orderDetail[0],
        quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
      });
    })
  );

  // Order INITIATED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        consumer_id: 1,
        vendor_id: 1,
        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });
      await returnId(knex('order_state')).insert({
        order_id: order[0],
        state: ORDER_STATES.INITIATED
      });
      [...Array(Math.floor(Math.random() * (3 - 1 + 1) + 1)).keys()].map(async () => {
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],

          modal_name: 'listing',
          modal_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (10 - 1 + 1) + 1)
        });
      });
    })
  );

  // Order COMPLETED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        consumer_id: 1,
        vendor_id: 1,
        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });
      await returnId(knex('order_state')).insert({
        order_id: order[0],
        state: ORDER_STATES.COMPLETED
      });
      [...Array(Math.floor(Math.random() * (3 - 1 + 1) + 1)).keys()].map(async () => {
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],

          modal_name: 'listing',
          modal_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
        });
      });
    })
  );
  // Order CANCELLED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        consumer_id: 1,
        vendor_id: 1,
        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });
      await returnId(knex('order_state')).insert({
        order_id: order[0],
        state: ORDER_STATES.CANCELLED
      });
      [...Array(Math.floor(Math.random() * (3 - 1 + 1) + 1)).keys()].map(async () => {
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],

          modal_name: 'listing',
          modal_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
        });
      });
    })
  );
};
