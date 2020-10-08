import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { LABEL } from '@gqlapp/home-common';

const CAROUSEl = 3;
const BANNER = 6;

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['dynamic_carousel']);

  await Promise.all(
    [...Array(CAROUSEl).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        title: `Nodejs${i + 1}`,
        description: `This is Nodejs${i + 1}`,
        image_url: `https://via.placeholder.com/2560x1600/141c1f?text=Nodejs${i + 1}`,
        link: null,
        label: LABEL[0],
        is_active: true
      });
    }),
    [...Array(BANNER).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        title: `Nodejs${i + CAROUSEl + 1}`,
        description: `This is Nodejs${i + CAROUSEl + 1}`,
        image_url:
          i === 4
            ? `https://via.placeholder.com/300x300/141c1f?text=This is image banner`
            : `https://via.placeholder.com/300x300/141c1f?text=Nodejs${i + CAROUSEl + 1}`,
        link: null,
        label: LABEL[1],
        is_active: true
      });
    })
  );
};
