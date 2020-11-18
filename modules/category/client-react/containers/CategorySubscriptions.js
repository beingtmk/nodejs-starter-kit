import update from 'immutability-helper';

import CATEGORIES_SUBSCRIPTION from '../graphql/CategoriesSubscription.graphql';
// eslint-disable-next-line import/prefer-default-export
export const subscribeToCategories = (subscribeToMore, filter) =>
  subscribeToMore({
    document: CATEGORIES_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            categoriesUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddCategories(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditCategories(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteCategories(prev, node.id);
      }
      return newResult;
    }
  });

function onAddCategories(prev, node) {
  // console.log('prev', prev, node);
  if (prev.categories.edges.some(category => node.id === category.cursor)) {
    return update(prev, {
      categories: {
        totalCount: {
          $set: prev.categories.totalCount - 1
        },
        edges: {
          $set: prev.categories.edges
        }
      }
    });
  }

  const filteredcategories = prev.categories.edges.filter(category => category.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'CategoryEdges'
  };

  return update(prev, {
    categories: {
      totalCount: {
        $set: prev.categories.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredcategories]
      }
    }
  });
}

function onEditCategories(prev, node) {
  const index = prev.cateogires.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'CategoryEdges'
  };
  if (index) {
    prev.cateogires.edges.splice(index, 1, edge);
    return update(prev, {
      cateogires: {
        edges: {
          $set: [...prev.cateogires.edges]
        }
      }
    });
  }
}

const onDeleteCategories = (prev, id) => {
  // console.log('called', id);
  const index = prev.categories.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    categories: {
      totalCount: {
        $set: prev.categories.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
