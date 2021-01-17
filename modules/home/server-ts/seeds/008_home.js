import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { LABEL } from '@gqlapp/home-common';

const CAROUSEl = 3;
const BANNER = 6;

const IMG_TAB_BANNER = [
  {
    title: 'JELLY FISH BONG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070400/mewcajc4vgsup8vwe7y9.webp'
  },
  {
    title: 'NINJA RIG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070442/xlugcaychf0mixdglqzy.webp'
  },
  {
    title: 'ROCKET BONG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070467/mfue95aorx0oagxfou1r.webp'
  },
  {
    title: 'RECYCLER RIG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070495/vee0hwmfzuuedxapywc4.webp'
  },
  {
    title: 'SPACE CAR BONG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070524/gk5d09zht3ooadrg3xe0.webp'
  },
  {
    title: 'HENNY V2 BONG BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070564/dvfcegifkjyhdygew18z.webp'
  },
  {
    title: 'ONE LOVE BOX',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070595/wxaze0ilenxndxq85ywt.webp'
  },
  {
    title: 'SHARK RIG BOX',
    link: '/home/dynamic-carousel/edit/18',
    label: 'Tab1',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070618/yucs8ynapg4rlbzgbewv.webp'
  },

  {
    title: 'JELLY FISH BONG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070650/m2b3hghvmex3nfoy5qy4.webp'
  },
  {
    title: 'NINJA RIG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070666/gorlxnsubni3bvee8r5g.webp'
  },
  {
    title: 'ROCKET BONG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070687/rkdnrsvk4ypx3f06hx0p.webp'
  },
  {
    title: 'RECYCLER RIG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070705/osm0ivcxyusf659jlgh3.webp'
  },
  {
    title: 'SPACE CAR BONG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070728/jp5phrvyrvmzslcq5vwa.webp'
  },
  {
    title: 'HENNY V2 BONG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070753/sd8s5c3xri6zxkd1wdfa.webp'
  },

  {
    title: 'ONE LOVE BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070775/qao7cjlmrnqhnwweke64.webp'
  },

  {
    title: 'SHARK RIG BOX',
    label: 'Tab2',
    image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1609070796/topwfwduyz7ux5omo64q.webp'
  }
];

const BANNER_IMG = {
  title: 'Banner 1',
  description: `#1 PREMIUM SMOKING ACCESSORIES SUBSCRIPTION BOX
$100+ VALUE FOR ONLY $39.99

DISCOVER PREMIUM GLASS, DAILY ESSENTIALS, AND LIMITED

EDITION SMOKING ACCESSORIES DELIVERED DISCREETLY TO YOUR DOOR`,
  link: '/listing/catalogue,Catalogue;/listing/category/1,Category',
  label: 'Banner',
  image_url: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1608990956/ntoxbrsiwajbutw6pn97.webp'
};

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
    }),
    [...Array(IMG_TAB_BANNER.length).keys()].map(async i => {
      return returnId(knex('dynamic_carousel')).insert({
        title: IMG_TAB_BANNER[i].title,
        description: IMG_TAB_BANNER[i].description,
        image_url: IMG_TAB_BANNER[i].image_url,
        link: IMG_TAB_BANNER[i].link,
        label: IMG_TAB_BANNER[i].label,
        is_active: true
      });
    }),
    await returnId(knex('dynamic_carousel')).insert({
      title: BANNER_IMG.title,
      description: BANNER_IMG.description,
      image_url: BANNER_IMG.image_url,
      link: BANNER_IMG.link,
      label: BANNER_IMG.label,
      is_active: true
    })
  );
};
