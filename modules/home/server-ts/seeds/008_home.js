import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['dynamic_carousel']);

  await Promise.all(
    [...Array(3).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        image_url: `https://via.placeholder.com/2560x1600/141c1f?text=Nodejs${i + 1}`,
        link: null,
        label: 'CAROUSEL',
        is_active: true
      });
    })
  );
};
