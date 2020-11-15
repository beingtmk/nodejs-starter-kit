import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';

import DISCOUNT_SUBSCRIPTION from '../graphql/DiscountSubscription.graphql';

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

export const subscribeToDiscounts = () => console.log('This is Discounts subscription');
