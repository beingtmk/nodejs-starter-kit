import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['listing', 'listing_image', 'listing_cost']);

  await Promise.all(
    [...Array(50).keys()].map(async ii => {
      const listing = await returnId(knex('listing')).insert({
        user_id: Math.floor(Math.random() * 2) + 1,
        // user_id: 1,
        title: `Listing ${ii + 1}`,
        description: `This is listing ${ii + 1}`,
        is_active: Math.random() < 0.6 ? false : true
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('listing_image')).insert({
            listing_id: listing[0],
            image_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXZ8SesX28HePAR71L995TcEpkx91g6SudGMG9FSC97oCkKkSI&usqp=CAU`
          });
        })
      );
      await returnId(knex('listing_cost')).insert({
        listing_id: listing[0],
        cost: Math.floor(Math.random() * (999 - 100 + 1) + 100)
      });
    })
  );
};
