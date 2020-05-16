import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex) {
  await truncateTables(knex, Promise, ['geolocation']);

  await Promise.all(
    [...Array(30).keys()].map(async () => {
      return returnId(knex('geolocation')).insert({
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
      });
    })
  );
}
