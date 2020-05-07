import { truncateTables } from '@gqlapp/database-server-ts';

const LISTING = [
  {
    id: 1,
    user_id: 1,
    title: 'Listing 1',
    description: 'This is listing 1.',
    is_active: true
  },
  {
    id: 2,
    user_id: 1,
    title: 'Listing 2',
    description: 'This is listing 2.',
    is_active: true
  },
  {
    id: 3,
    user_id: 1,
    title: 'Listing 3',
    description: 'This is listing 3.',
    is_active: true
  },
  {
    id: 4,
    user_id: 1,
    title: 'Listing 4',
    description: 'This is listing 4.',
    is_active: true
  }
];

const LISTING_IMG = [
  {
    listing_id: 1,
    description: 'This is image for listing.',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
  },
  {
    listing_id: 1,
    description: 'This is image for listing.',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
  },
  {
    listing_id: 2,
    description: 'This is image for listing.',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
  },
  {
    listing_id: 3,
    description: 'This is image for listing.',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
  },
  {
    listing_id: 4,
    description: 'This is image for listing.',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
  }
];

const LISTING_COST = [
  {
    listing_id: 1,
    cost: 999
  },
  {
    listing_id: 2,
    cost: 999
  },
  {
    listing_id: 3,
    cost: 999
  },
  {
    listing_id: 4,
    cost: 999
  }
];

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['listing', 'listing_image', 'listing_cost']);

  await knex('listing')
    .del()
    .then(function() {
      return knex('listing').insert(LISTING);
    });

  await knex('listing_image')
    .del()
    .then(function() {
      return knex('listing_image').insert(LISTING_IMG);
    });

  await knex('listing_cost')
    .del()
    .then(function() {
      return knex('listing_cost').insert(LISTING_COST);
    });
};
