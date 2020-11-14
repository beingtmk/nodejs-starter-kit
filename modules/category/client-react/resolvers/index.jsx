import update from 'immutability-helper';

import CATEGORIES_STATE_QUERY from '../graphql/CategoriesStateQuery.client.graphql';

const TYPE_CATEGORIES_STATE = 'CategoriesState';
const TYPE_CATEGORIES_STATE_FILTER = 'FilterListInput';
const TYPE_CATEGORIES_STATE_ORDER_BY = 'OrderByListInput';

const defaults = {
  categoriesState: {
    orderBy: {
      column: '',
      order: '',
      __typename: TYPE_CATEGORIES_STATE_ORDER_BY
    },
    filter: {
      searchText: '',
      modalName: '',

      isNavbar: '',
      isActive: true,

      __typename: TYPE_CATEGORIES_STATE_FILTER
    },
    __typename: TYPE_CATEGORIES_STATE
  }
};

const resolvers = {
  Mutation: {
    updateOrderByCategories: (_, { orderBy }, { cache }) => {
      // console.log('updateOrderBy', orderBy);
      const { categoriesState } = cache.readQuery({ query: CATEGORIES_STATE_QUERY });

      const newCategoriesState = update(categoriesState, {
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          categoriesState: newCategoriesState,
          __type: TYPE_CATEGORIES_STATE
        }
      });

      return null;
    },
    updateFilterCategories: (_, { filter, orderBy }, { cache }) => {
      // console.log('updateFilter', filter, orderBy);
      const { categoriesState } = cache.readQuery({ query: CATEGORIES_STATE_QUERY });

      const newCategoriesState = update(categoriesState, {
        filter: { $merge: filter },
        orderBy: { $merge: orderBy }
      });

      cache.writeData({
        data: {
          categoriesState: newCategoriesState,
          __type: TYPE_CATEGORIES_STATE
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
