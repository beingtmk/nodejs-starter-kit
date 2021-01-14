import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { MEDIA } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';

function averageRating(five, four, three, two, one, totalRatings) {
  return ((5 * five + 4 * four + 3 * three + 2 * two + 1 * one) / totalRatings).toFixed(1);
}

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, [
    'review',
    'review_helpful_user'
    // , 'review_image'
  ]);
  for (let ii = 0; ii < 200; ii++) {
    const modalId = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    const rate = String((Math.random() * (5.0 - 2.0 + 1.0) + 1.0).toFixed(1));

    const review = await returnId(knex('review')).insert({
      user_id: Math.floor(Math.random() * (2 - 1 + 1) + 1),
      feedback: `This is review ${ii +
        1} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      rating: rate,
      helpful: Math.floor(Math.random() * (50 - 1 + 1) + 1)
    });

    // Images
    await Promise.all(
      [...Array(3).keys()].map(async () => {
        return returnId(knex('review_medium')).insert({
          review_id: review[0],
          ...MEDIA[Math.floor(Math.random() * (1 - 0 + 1) + 0)],
          is_active: Math.random() < 0.6 ? false : true
        });
      })
    );

    // review helpful
    (Math.random() < 0.6 ? false : true) &&
      (await returnId(knex('review_helpful_user')).insert({
        review_id: review[0],
        user_id: Math.floor(Math.random() * 2) + 1
      }));

    await returnId(knex('modal_review')).insert({
      modal_name: MODAL[1].value,
      modal_id: modalId,
      review_id: review[0]
    });

    const avgRating = camelizeKeys(
      await knex('average_rating')
        .where('modal_name', MODAL[1].value)
        .andWhere('modal_id', modalId)
    );

    // console.log('avgRating', avgRating);
    if (avgRating.length > 0) {
      const avgRatings = avgRating[0];
      const input = {
        id: avgRatings.id,
        modalName: MODAL[1].value,
        modalId,
        five: avgRatings.five,
        four: avgRatings.four,
        three: avgRatings.three,
        two: avgRatings.two,
        one: avgRatings.one
      };
      switch (parseInt(rate)) {
        case 5:
          input.five = avgRatings && avgRatings.five ? avgRatings.five + 1 : 1;
          break;
        case 4:
          input.four = avgRatings && avgRatings.four ? avgRatings.four + 1 : 1;
          break;
        case 3:
          input.three = avgRatings && avgRatings.three ? avgRatings.three + 1 : 1;
          break;
        case 2:
          input.two = avgRatings && avgRatings.two ? avgRatings.two + 1 : 1;
          break;
        default:
          input.one = avgRatings && avgRatings.one ? avgRatings.one + 1 : 1;
      }

      await knex('average_rating')
        .where({ id: avgRatings.id })
        .update(
          decamelizeKeys({
            ...input,
            rating: averageRating(
              input.five || 0,
              input.four || 0,
              input.three || 0,
              input.two || 0,
              input.one || 0,
              (input.five || 0) + (input.four || 0) + (input.three || 0) + (input.two || 0) + (input.one || 0)
            )
          })
        );
    } else {
      const input = {
        modalName: MODAL[1].value,
        modalId,
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0
      };
      switch (parseInt(rate)) {
        case 5:
          input.five = avgRating && avgRating.five ? avgRating.five + 1 : 1;
          break;
        case 4:
          input.four = avgRating && avgRating.four ? avgRating.four + 1 : 1;
          break;
        case 3:
          input.three = avgRating && avgRating.three ? avgRating.three + 1 : 1;
          break;
        case 2:
          input.two = avgRating && avgRating.two ? avgRating.two + 1 : 1;
          break;
        default:
          input.one = avgRating && avgRating.one ? avgRating.one + 1 : 1;
      }
      await knex('average_rating').insert(
        decamelizeKeys({
          ...input,
          rating: averageRating(
            input.five || 0,
            input.four || 0,
            input.three || 0,
            input.two || 0,
            input.one || 0,
            (input.five || 0) + (input.four || 0) + (input.three || 0) + (input.two || 0) + (input.one || 0)
          )
        })
      );
    }
  }

  // await Promise.all(
  //   [...Array(200).keys()].map(async ii => {
  //     const modalId = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  //     const rate = String((Math.random() * (5.0 - 2.0 + 1.0) + 1.0).toFixed(1));

  //     const review = await returnId(knex('review')).insert({
  //       user_id: Math.floor(Math.random() * (2 - 1 + 1) + 1),
  //       feedback: `This is review ${ii +
  //         1} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  //       rating: rate,
  //       helpful: Math.floor(Math.random() * (50 - 1 + 1) + 1),
  //     });

  //     // Images
  //     await Promise.all(
  //       [...Array(3).keys()].map(async () => {
  //         return returnId(knex('review_medium')).insert({
  //           review_id: review[0],
  //           ...MEDIA[Math.floor(Math.random() * (1 - 0 + 1) + 0)],
  //           is_active: Math.random() < 0.6 ? false : true,
  //         });
  //       })
  //     );

  //     // review helpful
  //     (Math.random() < 0.6 ? false : true) &&
  //       (await returnId(knex('review_helpful_user')).insert({
  //         review_id: review[0],
  //         user_id: Math.floor(Math.random() * 2) + 1,
  //       }));

  //     returnId(knex('modal_review')).insert({
  //       modal_name: MODAL[1].value,
  //       modal_id: modalId,
  //       review_id: review[0],
  //     });

  //     const avgRating = camelizeKeys(
  //       await knex('average_rating')
  //         .where('modal_name', MODAL[1].value)
  //         .andWhere('modal_id', modalId)
  //     );

  //     console.log('avgRating', avgRating);
  //     if (avgRating.length > 0) {
  //       const avgRatings = avgRating[0];
  //       const input = {
  //         id: avgRatings.id,
  //         modalName: MODAL[1].value,
  //         modalId,
  //       };
  //       switch (parseInt(rate)) {
  //         case 5:
  //           input.five = avgRatings && avgRatings.five ? avgRatings.five + 1 : 1;
  //           break;
  //         case 4:
  //           input.four = avgRatings && avgRatings.four ? avgRatings.four + 1 : 1;
  //           break;
  //         case 3:
  //           input.three = avgRatings && avgRatings.three ? avgRatings.three + 1 : 1;
  //           break;
  //         case 2:
  //           input.two = avgRatings && avgRatings.two ? avgRatings.two + 1 : 1;
  //           break;
  //         default:
  //           input.one = avgRatings && avgRatings.one ? avgRatings.one + 1 : 1;
  //       }

  //       const updateReview = camelizeKeys(
  //         await knex('average_rating')
  //           .where({ id: avgRatings.id })
  //           .update(decamelizeKeys(input))
  //       );
  //     } else {
  //       const input = {
  //         modalName: MODAL[1].value,
  //         modalId,
  //       };
  //       switch (parseInt(rate)) {
  //         case 5:
  //           input.five = avgRating && avgRating.five ? avgRating.five + 1 : 1;
  //           break;
  //         case 4:
  //           input.four = avgRating && avgRating.four ? avgRating.four + 1 : 1;
  //           break;
  //         case 3:
  //           input.three = avgRating && avgRating.three ? avgRating.three + 1 : 1;
  //           break;
  //         case 2:
  //           input.two = avgRating && avgRating.two ? avgRating.two + 1 : 1;
  //           break;
  //         default:
  //           input.one = avgRating && avgRating.one ? avgRating.one + 1 : 1;
  //       }
  //       const insertReview = camelizeKeys(await knex('average_rating').insert(decamelizeKeys(input)));
  //     }
  //   })
  // );
};
