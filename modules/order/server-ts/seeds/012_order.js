import { returnId, truncateTables } from '@gqlapp/database-server-ts';

import { MEDIA } from '@gqlapp/listing-common';
import { ORDER_STATES_ARRAY } from '@gqlapp/order-common';
import { MODAL } from '@gqlapp/review-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['order', 'order_state', 'order_detail', 'order_option']);

  await Promise.all(
    [...Array(ORDER_STATES_ARRAY.length).keys()].map(async i => {
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
      const modal = await knex('listing')
        .where('listing.id', '=', id)
        .from('listing')
        .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id');
      const orderDetail = await returnId(knex('order_detail')).insert({
        order_id: order[0],
        vendor_id: modal[0].user_id,
        modal_name: MODAL[1].value,
        modal_id: id,
        order_detail_state_id: 1,

        image_url: MEDIA[Math.floor(Math.random() * (MEDIA.length - 2 - 0 + 1) + 0)].url,
        title: modal[0].title,
        cost: modal[0].cost
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
    [...Array(20).keys()].map(async () => {
      const User2 = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      const addresses2 = await knex('user_address').where('user_id', '=', User2);
      const orderState = Math.floor(Math.random() * (4 - 2 + 1) + 2);
      const order2 = await returnId(knex('order')).insert({
        consumer_id: User2,
        order_state_id: orderState,

        tracking_id: Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()
      });

      // const User3 = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      // const addresses3 = await knex('user_address').where('user_id', '=', User3);
      // const order3 = await returnId(knex('order')).insert({
      //   consumer_id: User3,
      //   order_state_id: 3,

      //   tracking_id: Math.random()
      //     .toString(36)
      //     .substring(7)
      //     .toUpperCase()
      // });

      // const User4 = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      // const addresses4 = await knex('user_address').where('user_id', '=', User4);
      // const order4 = await returnId(knex('order')).insert({
      //   consumer_id: User4,
      //   order_state_id: 4,

      //   tracking_id: Math.random()
      //     .toString(36)
      //     .substring(7)
      //     .toUpperCase()
      // });

      await Promise.all(
        [...Array(2).keys()].map(async () => {
          const id2 = Math.floor(Math.random() * (50 - 1 + 1) + 1);
          const modal2 = await knex('listing')
            .where('listing.id', '=', id2)
            .from('listing')
            .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id');
          const orderDetail2 = await returnId(knex('order_detail')).insert({
            order_id: order2[0],
            vendor_id: modal2[0].user_id,
            modal_name: MODAL[1].value,
            modal_id: id2,
            order_detail_state_id: orderState,

            image_url: MEDIA[Math.floor(Math.random() * (MEDIA.length - 2 - 0 + 1) + 0)].url,
            title: modal2[0].title,
            cost: modal2[0].cost
          });
          await returnId(knex('order_option')).insert({
            order_detail_id: orderDetail2[0],
            quantity: Math.floor(Math.random() * (10 - 1 + 1) + 1)
          });

          await returnId(knex('order_delivery')).insert({
            order_detail_id: orderDetail2[0],
            address_id: addresses2[0].id
          });

          //   const id3 = Math.floor(Math.random() * (50 - 1 + 1) + 1);
          //   const modal3 = await knex('listing')
          //     .where('listing.id', '=', id3)
          //     .from('listing')
          //     .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id');
          //   const orderDetail3 = await returnId(knex('order_detail')).insert({
          //     order_id: order3[0],
          //     vendor_id: modal3[0].user_id,
          //     modal_name: MODAL[1].value,
          //     modal_id: id3,
          //     order_detail_state_id: 3,

          //     image_url: MEDIA[Math.floor(Math.random() * (MEDIA.length - 2 - 0 + 1) + 0)].url,
          //     title: modal3[0].title,
          //     cost: modal3[0].cost
          //   });
          //   await returnId(knex('order_option')).insert({
          //     order_detail_id: orderDetail3[0],
          //     quantity: Math.floor(Math.random() * (10 - 1 + 1) + 1)
          //   });
          //   await returnId(knex('order_delivery')).insert({
          //     order_detail_id: orderDetail3[0],
          //     address_id: addresses3[0].id
          //   });

          //   const id4 = Math.floor(Math.random() * (50 - 1 + 1) + 1);
          //   const modal4 = await knex('listing')
          //     .where('listing.id', '=', id4)
          //     .from('listing')
          //     .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id');
          //   const orderDetail4 = await returnId(knex('order_detail')).insert({
          //     order_id: order4[0],
          //     vendor_id: modal4[0].user_id,
          //     modal_name: MODAL[1].value,
          //     modal_id: id4,
          //     order_detail_state_id: 4,

          //     image_url: MEDIA[Math.floor(Math.random() * (MEDIA.length - 2 - 0 + 1) + 0)].url,
          //     title: modal4[0].title,
          //     cost: modal4[0].cost
          //   });
          //   await returnId(knex('order_option')).insert({
          //     order_detail_id: orderDetail4[0],
          //     quantity: Math.floor(Math.random() * (10 - 1 + 1) + 1)
          //   });
          //   await returnId(knex('order_delivery')).insert({
          //     order_detail_id: orderDetail4[0],
          //     address_id: addresses4[0].id
          //   });
        })
      );
    })
  );
};
