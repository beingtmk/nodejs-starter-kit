import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { PLATFORM_TYPE } from '@gqlapp/setting-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['platform', 'platform_info', 'platform_social']);

  await Promise.all(
    [...Array(1).keys()].map(async () => {
      const platformId = await returnId(knex('platform')).insert({
        name: 'Approxyma',
        logo: 'https://res.cloudinary.com/www-lenshood-in/image/upload/v1580224348/nodejs-starterkit/untitled_5.svg',
        type: PLATFORM_TYPE[1]
      });
      await returnId(knex('platform_info')).insert({
        platform_id: platformId[0],
        mobile: '+918888888888',
        email: 'nodejs-starterkit@approxyma.com',
        address: '4502 Elk Rd Little, Scottsdale, Arizona-85256'
      });
      return returnId(knex('platform_social')).insert({
        platform_id: platformId[0],
        youtube: 'https://youtube.com',
        facebook: 'http://facebook.com/',
        instagram: 'https://www.instagram.com/',
        linked_in: 'https://www.linkedin.com/',
        twitter: 'https://twitter.com/'
      });
    })
  );
};
