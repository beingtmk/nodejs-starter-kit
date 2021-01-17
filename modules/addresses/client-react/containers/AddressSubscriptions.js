import update from 'immutability-helper';

import ADDRESSES_SUBSCRIPTION from '../graphql/AddressesSubscription.graphql';

// eslint-disable-next-line import/prefer-default-export
export const subscribeToAddresses = (subscribeToMore, userId) =>
  subscribeToMore({
    document: ADDRESSES_SUBSCRIPTION,
    variables: { userId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            addressesUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddAddresses(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditAddresses(prev, node);
      } else if (mutation === 'DEFAULT_UPDATED') {
        newResult = onDefualtAddress(prev, node.id);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteAddresses(prev, node.id);
      }
      return newResult;
    }
  });

function onAddAddresses(prev, node) {
  // console.log('prev', prev, node);
  const filteredAddresses = prev.addresses.filter(address => address.id !== null);

  return update(prev, {
    addresses: {
      $set: [node, ...filteredAddresses]
    }
  });
}

function onEditAddresses(prev, node) {
  const index = prev.addresses.findIndex(x => x.id === node.id);

  if (index) {
    prev.addresses.edges.splice(index, 1, node);
    return update(prev, {
      addresses: {
        $set: [...prev.addresses]
      }
    });
  }
}

function onDefualtAddress(prev, node) {
  const indexForTrue = prev.addresses.findIndex(x => x.id === node.id);
  const indexForFalse = prev.addresses.findIndex(x => x.isDefault);

  const falseNode = prev.addresses[indexForFalse];
  falseNode.isDefault = false;

  if (indexForTrue) {
    prev.addresses.edges.splice(indexForTrue, 1, node);
    prev.addresses.edges.splice(indexForFalse, 1, falseNode);
    return update(prev, {
      addresses: {
        $set: [...prev.addresses]
      }
    });
  }
}

const onDeleteAddresses = (prev, id) => {
  // console.log('called', id);
  const index = prev.addresses.findIndex(x => x.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    addresses: {
      $splice: [[index, 1]]
    }
  });
};
