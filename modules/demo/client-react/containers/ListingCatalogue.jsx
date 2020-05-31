import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';

import ListingCatalogueView from '../components/ListingCatalogueView';

import Avatar from '../Icons/userimage.svg';
import Product from '../Icons/product.svg';

import Banner from '../Icons/MangoCakes.svg';
import Cakes from '../Icons/cakes.svg';
import Cupcakes from '../Icons/cupcakes.svg';
import Pastries from '../Icons/pastries.svg';
import Bread from '../Icons/bread.svg';
import Chocolate from '../Icons/chocolate.svg';

const LISTINGS = [
  {
    id: 1,
    userId: 1,
    ratting: 3,
    title: 'Barbie Floral Cake',
    description: 'Custom Cake',
    listingCost: {
      id: 1,
      cost: 1200
    },
    listingImages: [
      {
        imageUrl: Product
      },
      {
        imageUrl: Product
      }
    ]
  },
  {
    id: 2,
    userId: 1,
    ratting: 3,
    title: 'Barbie Floral Cake',
    description: 'Custom Cake',
    listingCost: {
      id: 1,
      cost: 1200
    },
    listingImages: [
      {
        imageUrl: Product
      },
      {
        imageUrl: Product
      }
    ]
  },
  {
    id: 3,
    userId: 1,
    ratting: 3,
    title: 'Barbie Floral Cake',
    description: 'Custom Cake',
    listingCost: {
      id: 1,
      cost: 1200
    },
    listingImages: [
      {
        imageUrl: Product
      },
      {
        imageUrl: Product
      }
    ]
  },
  {
    id: 4,
    userId: 1,
    ratting: 3,
    title: 'Barbie Floral Cake',
    description: 'Custom Cake',
    listingCost: {
      id: 1,
      cost: 1200
    },
    listingImages: [
      {
        imageUrl: Product
      },
      {
        imageUrl: Product
      }
    ]
  },
  {
    id: 5,
    userId: 1,
    ratting: 3,
    title: 'Barbie Floral Cake',
    description: 'Custom Cake',
    listingCost: {
      id: 1,
      cost: 1200
    },
    listingImages: [
      {
        imageUrl: Product
      },
      {
        imageUrl: Product
      }
    ]
  }
];

const HOMESLICK = [
  {
    thumbnail: Banner
  },
  {
    thumbnail: Banner
  },
  {
    thumbnail: Banner
  }
];

const USER = {
  id: 1,
  name: 'Riya Rodriguez',
  email: 'muffin.sweet@gmail.com',
  thumbnail: Avatar,
  // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  ratting: 4.6,
  distance: 3,
  menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
  details:
    "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
};
const USERS = [
  {
    id: 1,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 2,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 3,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 4,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 5,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  }
];

const CATEGORYSLICK = [
  {
    icon: Cakes,
    category: 'Cakes'
  },
  {
    icon: Cupcakes,
    category: 'Cupcakes'
  },
  {
    icon: Pastries,
    category: 'Pastries'
  },
  {
    icon: Bread,
    category: 'Bread'
  },
  {
    icon: Chocolate,
    category: 'Chocolate'
  }
];

const PROFILELIST = [
  {
    id: 1,
    title: 'My orders',
    details: '12 orders'
  },
  {
    id: 2,
    title: 'Delivery addresses',
    details: '3 ddresses'
  },
  {
    id: 3,
    title: 'Payment methods',
    details: 'Visa **34'
  },
  {
    id: 4,
    title: 'Promocodes',
    details: 'You have special promocodes'
  },
  {
    id: 5,
    title: 'My reviews',
    details: 'Reviews for 4 items'
  },
  {
    id: 6,
    title: 'Settings',
    details: 'Notifications, password'
  }
];

const ListingCatalogue = props => {
  console.log('props', props);
  return (
    <ListingCatalogueView
      {...props}
      listings={LISTINGS}
      users={USERS}
      user={USER}
      homeSlick={HOMESLICK}
      categorySlick={CATEGORYSLICK}
      profileList={PROFILELIST}
    />
  );
};

export default translate('demo')(ListingCatalogue);
