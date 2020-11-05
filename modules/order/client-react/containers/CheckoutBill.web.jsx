import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ADDRESSES_QUERY from '@gqlapp/addresses-client-react/graphql/AddressesQuery.graphql';
import ADD_OR_EDIT_ADDRESS from '@gqlapp/addresses-client-react/graphql/AddOrEditAddress.graphql';
import DELETE_ADDRESS from '@gqlapp/addresses-client-react/graphql/DeleteAddress.graphql';

import ROUTES from '../routes';
import CheckoutBillView from '../components/CheckoutBillView';
import { withCurrentUser, withGetCart, withPatchAddress } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';

const CheckoutBill = props => {
  const { history, patchAddress, addresses, subscribeToMore, getCart } = props;
  const [addressId, setAddressId] = React.useState(0);

  React.useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const handleSelect = id => {
    // console.log('addresses id', id);
    setAddressId(id);
  };

  async function onSubmit() {
    try {
      const addressMutation = await patchAddress(addressId === 0 ? addresses[0].id : addressId);
      if (history && addressMutation) {
        return history.push(`${ROUTES.checkoutOrderLink}${props.getCart.id}`);
      } else {
        Message.error('Try again!!');
      }
    } catch (e) {
      throw Error(e);
    }
  }

  // console.log('props', props);
  return <CheckoutBillView onSubmit={onSubmit} btnDisabled={addressId === 0} onSelect={handleSelect} {...props} />;
};

const getAddressCache = (cache, userId) =>
  cache.readQuery({
    query: ADDRESSES_QUERY,
    variables: {
      id: userId
    }
  });

const onAddAddress = (prev, node) => {
  // ignore if duplicate
  if (prev.addresses.some(address => address.id === node.id)) {
    return prev;
  }
  return update(prev, {
    addresses: {
      $set: [...prev.addresses, node]
    }
  });
};
const writePostToCache = (cache, address, userId) =>
  cache.writeQuery({
    query: ADDRESSES_QUERY,
    variables: {
      id: userId
    },
    data: {
      addresses: address,
      __type: 'Address'
    }
  });

CheckoutBill.propTypes = {
  getCart: PropTypes.object,
  addresses: PropTypes.object,
  patchAddress: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object
};

export default compose(
  withCurrentUser,
  withGetCart,
  withPatchAddress,
  graphql(ADDRESSES_QUERY, {
    options: ({ currentUser }) => {
      return { variables: { id: currentUser && currentUser.id } };
    },
    props({ data: { loading, error, addresses } }) {
      if (error) throw new Error(error);
      return { loading, addresses };
    }
  }),
  graphql(ADD_OR_EDIT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      addOrEditAddresses: async values => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          values.userId = currentUser && currentUser.id;
          values.pinCode = Number(values.pinCode);
          const input = removeTypename(values);
          const {
            data: { addOrEditAddress }
          } = await mutate({
            variables: {
              input: input
            },
            update: (cache, { data: { addOrEditAddress } }) => {
              const prevAddress = getAddressCache(cache, currentUser && currentUser.id);
              if (prevAddress.addresses) {
                const { addresses } = onAddAddress(prevAddress, addOrEditAddress);
                writePostToCache(cache, addresses, currentUser && currentUser.id);
              }
            }
          });
          Message.destroy();
          if (addOrEditAddress) {
            Message.success('Address added!!');
          }
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(DELETE_ADDRESS, {
    props: ({ mutate }) => ({
      deleteAddress: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteAddress: {
              id,
              __typename: 'Addresses'
            }
          }
          // ,

          // update: store => {
          //   // Get previous events from cache
          //   const prevEvents = store.readQuery({ query: EVENTS_QUERY });
          //   // Write events to cache

          //   store.writeQuery({
          //     query: EVENTS_QUERY,
          //     data: { events: prevEvents.events.filter(event => event.id !== id), __typename: 'Events' }
          //   });
          // }
        });
        Message.error('Address deleted.');
      }
    })
  })
)(translate('order')(CheckoutBill));
