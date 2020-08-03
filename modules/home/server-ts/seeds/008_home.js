import { returnId, truncateTables } from '@gqlapp/database-server-ts';

exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ['dynamic_carousel']);

  await returnId(knex('dynamic_carousel')).insert({
    image_url: 'https://rashiratanjaipur.net/media/wysiwyg/Banner/pmkkgems.jpg',
    link: null,
    label: '',
    is_active: true
  });
  await returnId(knex('dynamic_carousel')).insert({
    image_url: 'https://rashiratanjaipur.net/media/wysiwyg/Banner/pmkkgems_jewellery-compressor.jpg',
    link: '/',
    label: '',
    is_active: true
  });
  await returnId(knex('dynamic_carousel')).insert({
    image_url: 'https://rashiratanjaipur.net/media/wysiwyg/Banner/Gemstone_recommendation-_PMKK_GEMS.jpg',
    link: null,
    label: '',
    is_active: true
  });
  await returnId(knex('dynamic_carousel')).insert({
    image_url: 'https://rashiratanjaipur.net/media/wysiwyg/savan_banner.jpg',
    link: null,
    label: '',
    is_active: true
  });
  await returnId(knex('dynamic_carousel')).insert({
    image_url: 'https://rashiratanjaipur.net/media/wysiwyg/Banner/banner_-_pmkkgems.jpg',
    link: '',
    label: '',
    is_active: true
  });
  //   await Promise.all(
  //     [...Array(3).keys()].map(async () => {
  //       return returnId(knex('dynamic_carousel')).insert({
  //         image_url: 'https://rashiratanjaipur.net/media/wysiwyg/Banner/pmkkgems.jpg',
  //         link: '',
  //         label: '',
  //         is_active: true
  //       });
  //     })
  //   );
};
