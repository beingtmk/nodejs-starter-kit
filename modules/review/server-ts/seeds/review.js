import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, [
    'review'
    // , 'review_image'
  ]);
  await Promise.all(
    [...Array(50).keys()].map(async ii => {
      await returnId(knex('event')).insert({
        title: `Event ${ii + 1}`
      });
      await returnId(knex('blog')).insert({
        title: `Blog ${ii + 1}`
      });
      return true;
    })
  );

  await Promise.all(
    [...Array(200).keys()].map(async ii => {
      const review = await returnId(knex('review')).insert({
        // baker_id: Math.floor(Math.random() * (16 - 2 + 1) + 2),
        user_id: Math.floor(Math.random() * (2 - 1 + 1) + 1),
        feedback: `This is review ${ii + 1} `,
        rating: Number((Math.random() * (5.0 - 2.0 + 1.0) + 1.0).toFixed(1))
      });
      // await Promise.all(
      //   [...Array(3).keys()].map(async () => {
      //     return returnId(knex('review_image')).insert({
      //       review_id: review[0],
      //       image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1593961377/wfouh2evldlk2otnxepx.svg',
      //     });
      //   })
      // );
      if (Math.random() >= 0.5) {
        return returnId(knex('event_review')).insert({
          event_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),
          review_id: review[0]
        });
      } else {
        return returnId(knex('blog_review')).insert({
          blog_id: Math.floor(Math.random() * (50 - 1 + 1) + 1),
          review_id: review[0]
        });
      }
    })
  );
  // await Promise.all(
  //   [...Array(15).keys()].map(async ii => {
  //     return returnId(knex('rating')).insert({
  //       user_id: ii + 2,
  //       one: Math.floor(Math.random() * 5) + 1,
  //       two: Math.floor(Math.random() * 5) + 1,
  //       three: Math.floor(Math.random() * 5) + 1,
  //       four: Math.floor(Math.random() * 5) + 1,
  //       five: Math.floor(Math.random() * 5) + 1,
  //     });
  //   })
  // );
};
