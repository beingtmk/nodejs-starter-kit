import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { MEDIA } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, [
    'review',
    'review_helpful_user'
    // , 'review_image'
  ]);

  await Promise.all(
    [...Array(200).keys()].map(async ii => {
      const review = await returnId(knex('review')).insert({
        // baker_id: Math.floor(Math.random() * (16 - 2 + 1) + 2),
        user_id: Math.floor(Math.random() * (2 - 1 + 1) + 1),
        feedback: `This is review ${ii +
          1} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        rating: String((Math.random() * (5.0 - 2.0 + 1.0) + 1.0).toFixed(1)),
        helpful: Math.floor(Math.random() * (50 - 1 + 1) + 1)
      });
      await Promise.all(
        [...Array(3).keys()].map(async () => {
          return returnId(knex('review_medium')).insert({
            review_id: review[0],
            ...MEDIA[Math.floor(Math.random() * (1 - 0 + 1) + 0)],
            is_active: Math.random() < 0.6 ? false : true
          });
        })
      );
      (Math.random() < 0.6 ? false : true) &&
        (await returnId(knex('review_helpful_user')).insert({
          review_id: review[0],
          user_id: Math.floor(Math.random() * 2) + 1
        }));
      return returnId(knex('modal_review')).insert({
        modal_name: MODAL[1].value,
        modal_id: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        review_id: review[0]
      });
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
