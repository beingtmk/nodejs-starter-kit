import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { LABEL } from '@gqlapp/home-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['dynamic_carousel']);

  await Promise.all(
    [...Array(3).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        image_url: `https://via.placeholder.com/2560x1600/141c1f?text=Nodejs${i + 1}`,
        link: null,
        label: LABEL[0],
        is_active: true
      });
    }),
    [...Array(3).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        image_url: `https://via.placeholder.com/300x300/141c1f?text=Nodejs${i + 4}`,
        link: null,
        label: LABEL[1],
        is_active: true
      });
    })
  );
};
