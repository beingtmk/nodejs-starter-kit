import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';

import DISCOUNT_SUBSCRIPTION from '../graphql/DiscountSubscription.graphql';
import DISCOUNTS_SUBSCRIPTION from '../graphql/DiscountsSubscription.graphql';

export const subscribeToDiscount = (subscribeToMore, modalId) =>
  subscribeToMore({
    document: DISCOUNT_SUBSCRIPTION,
    variables: { modalId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            discountUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      // console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditDiscount(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDiscount(prev);
      }
      return newResult;
    }
  });

function onEditDiscount(prev, node) {
  // console.log(prev, node);
  return update(prev, {
    modalDiscount: {
      $set: node
    }
  });
}

const onDeleteDiscount = prev => {
  Message.info('This discount has been expired!');
  return update(prev, {
    modalDiscount: {
      $set: null
    }
  });
};

export const subscribeToDiscounts = (subscribeToMore, filter) =>
  subscribeToMore({
    document: DISCOUNTS_SUBSCRIPTION,
    variables: { filter },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            discountsUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddDiscounts(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditDiscounts(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDiscounts(prev, node.id);
      }
      return newResult;
    }
  });
function onAddDiscounts(prev, node) {
  if (prev.discounts.edges.some(discount => node.id === discount.cursor)) {
    return update(prev, {
      discounts: {
        totalCount: {
          $set: prev.discounts.totalCount - 1
        },
        edges: {
          $set: prev.discounts.edges
        }
      }
    });
  }

  const filtereddiscounts = prev.discounts.edges.filter(discount => discount.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'DiscountEdges'
  };

  return update(prev, {
    discounts: {
      totalCount: {
        $set: prev.discounts.totalCount + 1
      },
      edges: {
        $set: [edge, ...filtereddiscounts]
      }
    }
  });
}

function onEditDiscounts(prev, node) {
  const index = prev.discounts.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'DiscountEdges'
  };
  if (index) {
    prev.discounts.edges.splice(index, 1, edge);
    return update(prev, {
      discounts: {
        edges: {
          $set: [...prev.discounts.edges]
        }
      }
    });
  }
}

const onDeleteDiscounts = (prev, id) => {
  // console.log('called', id);
  const index = prev.discount.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    discount: {
      totalCount: {
        $set: prev.discount.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
