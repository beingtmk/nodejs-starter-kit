import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex) {
  await truncateTables(knex, Promise, ['content_comment', 'blog_comment', 'reply_comment']);

  await Promise.all(
    [...Array(40).keys()].map(async i => {
      return returnId(knex('content_comment')).insert({
        content: `Comment ${i + 1}`,
        user_id: Math.floor(Math.random() * 12) + 1
      });
    })
  );

  await Promise.all(
    [...Array(20).keys()].map(async i => {
      return returnId(knex('blog_comment')).insert({
        blog_id: Math.floor(Math.random() * 10) + 1,
        comment_id: i + 1
      });
    })
  );

  await Promise.all(
    [...Array(20).keys()].map(async i => {
      return returnId(knex('reply_comment')).insert({
        reference_id: Math.floor(Math.random() * 20) + 1,
        comment_id: 20 + i + 1
      });
    })
  );
}
