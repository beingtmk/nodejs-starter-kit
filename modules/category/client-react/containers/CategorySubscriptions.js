import update from 'immutability-helper';
import { Message } from '@gqlapp/look-client-react';

// eslint-disable-next-line import/no-named-default
import { default as HOME_ROUTES } from '@gqlapp/home-client-react/routes';

import CATEGORIES_SUBSCRIPTION from '../graphql/CategoriesSubscription.graphql';
import CATEGORY_SUBSCRIPTION from '../graphql/CategorySubscription.graphql';
import ROUTES from '../routes';

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
  // console.log(node, 'node');
  const index = prev.categories.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'CategoryEdges'
  };
  if (index) {
    prev.categories.edges.splice(index, 1, edge);
    return update(prev, {
      categories: {
        edges: {
          $set: [...prev.categories.edges]
        }
      }
    });
  }
}

const onDeleteCategories = (prev, id) => {
  console.log('called', id);
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
export const subscribeToCategory = (subscribeToMore, CategoryId, history) =>
  subscribeToMore({
    document: CATEGORY_SUBSCRIPTION,
    variables: { id: CategoryId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            categoryUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditCategory(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteCategory(history);
      }
      return newResult;
    }
  });

function onEditCategory(prev, node) {
  return update(prev, {
    category: {
      $set: node
    }
  });
}

const onDeleteCategory = history => {
  Message.info('This Category has been deleted!');
  if (history) {
    Message.warn('Redirecting to Categories');
    return history.push(`${ROUTES.adminPanel}`);
  } else {
    return history.push(`${HOME_ROUTES.home}`);
  }
};
