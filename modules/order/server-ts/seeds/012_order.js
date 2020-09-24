import { returnId, truncateTables } from '@gqlapp/database-server-ts';

import { ORDER_STATES_ARRAY } from '@gqlapp/order-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['order', 'order_state', 'order_detail', 'order_option']);

  await Promise.all(
    [...Array(4).keys()].map(async i => {
      await returnId(knex('order_state')).insert({
        state: ORDER_STATES_ARRAY[i]
      });
    })
  );

  // Order STALE
  await Promise.all(
    [...Array(1).keys()].map(async () => {
      const order = await returnId(knex('order')).insert({
        consumer_id: Math.floor(Math.random() * (2 - 1 + 1) + 1),
        order_state_id: 1,

        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });
      const id = Math.floor(Math.random() * (50 - 1 + 1) + 1);
      const modal = await knex('listing').where('id', '=', id);
      const orderDetail = await returnId(knex('order_detail')).insert({
        order_id: order[0],
        vendor_id: modal[0].user_id,
        modal_name: 'listing',
        modal_id: id,

        image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
        title: 'Listing',
        cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
      });
      await returnId(knex('order_option')).insert({
        order_detail_id: orderDetail[0],
        quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
      });
      await returnId(knex('order_delivery')).insert({
        order_detail_id: orderDetail[0],
        address_id: 1
      });
    })
  );

  // Order INITIATED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const User = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      const addresses = await knex('user_address').where('user_id', '=', User);
      const order = await returnId(knex('order')).insert({
        consumer_id: User,
        order_state_id: 2,

        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });

      [...Array(2).keys()].map(async () => {
        const id = Math.floor(Math.random() * (50 - 1 + 1) + 1);
        const modal = await knex('listing').where('id', '=', id);
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],
          vendor_id: modal[0].user_id,
          modal_name: 'listing',
          modal_id: id,

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (10 - 1 + 1) + 1)
        });

        await returnId(knex('order_delivery')).insert({
          order_detail_id: orderDetail[0],
          address_id: addresses[0].id
        });
      });
    })
  );

  // Order COMPLETED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const User = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      const addresses = await knex('user_address').where('user_id', '=', User);
      const order = await returnId(knex('order')).insert({
        consumer_id: User,
        order_state_id: 3,

        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });

      [...Array(2).keys()].map(async () => {
        const id = Math.floor(Math.random() * (50 - 1 + 1) + 1);
        const modal = await knex('listing').where('id', '=', id);
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],
          vendor_id: modal[0].user_id,
          modal_name: 'listing',
          modal_id: id,

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
        });

        await returnId(knex('order_delivery')).insert({
          order_detail_id: orderDetail[0],
          address_id: addresses[0].id
        });
      });
    })
  );
  // Order CANCELLED
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const User = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      const addresses = await knex('user_address').where('user_id', '=', User);
      const order = await returnId(knex('order')).insert({
        consumer_id: User,
        order_state_id: 4,

        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });

      [...Array(2).keys()].map(async () => {
        const id = Math.floor(Math.random() * (50 - 1 + 1) + 1);
        const modal = await knex('listing').where('id', '=', id);
        const orderDetail = await returnId(knex('order_detail')).insert({
          order_id: order[0],
          vendor_id: modal[0].user_id,
          modal_name: 'listing',
          modal_id: id,

          image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
          title: 'Listing',
          cost: Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        });
        await returnId(knex('order_option')).insert({
          order_detail_id: orderDetail[0],
          quantity: Math.floor(Math.random() * (50 - 1 + 1) + 1)
        });
        await returnId(knex('order_delivery')).insert({
          order_detail_id: orderDetail[0],
          address_id: addresses[0].id
        });
      });
    })
  );
};
