import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex) {
  await truncateTables(knex, Promise, ['blog_tag']);

  await Promise.all(
    [...Array(40).keys()].map(async i => {
      return returnId(knex('blog_tag')).insert({
        text: `tag${(i + 1) % 10}`,
        blog_id: Math.floor(Math.random() * 10) + 1
      });
    })
  );
}
