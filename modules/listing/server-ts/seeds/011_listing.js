import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['listing', 'listing_media', 'listing_cost']);

  await Promise.all(
    [...Array(100).keys()].map(async ii => {
      const isDiscount = Math.random() < 0.6 ? false : true;
      const isActive = Math.random() < 0.6 ? false : true;
      const listing = await returnId(knex('listing')).insert({
        user_id: Math.floor(Math.random() * 2) + 1,

        title: `Listing ${ii + 1}`,
        description: `This is listing ${ii + 1}`,
        inventory_count: Math.floor(Math.random() * (50 - 1 + 1) + 1),

        is_featured: Math.random() < 0.6 ? false : true,
        is_new: Math.random() < 0.6 ? false : true,
        is_discount: isDiscount,
        is_active: isActive
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('listing_media')).insert({
            listing_id: listing[0],
            url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1599752239/hs2uxkcx4e32zlygbdds.jpg',
            is_active: Math.random() < 0.6 ? false : true
          });
        })
      );
      await returnId(knex('listing_cost')).insert({
        listing_id: listing[0],
        cost: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        daily_discount: ii % 2 == 0 ? Math.random() * (60 - 2) + 2 : null,
        is_active: isActive
      });
      (Math.random() < 0.6 ? false : true) &&
        (await returnId(knex('listing_bookmark')).insert({
          listing_id: listing[0],
          user_id: Math.floor(Math.random() * 2) + 1
        }));
    })
  );
};
