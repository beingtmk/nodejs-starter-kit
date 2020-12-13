import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';

// Query
import GET_DEFAULT_ADDRESS_ID_QUERY from '../graphql/GetDefaultAddressIdQuery.graphql';
import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';

// Mutation
import SET_DEFAULT_ADDRESS from '../graphql/SetDefaultAddress.graphql';
import ADD_OR_EDIT_ADDRESS from '../graphql/AddOrEditAddress.graphql';
import DELETE_ADDRESS from '../graphql/DeleteAddress.graphql';

// Query
export const withGetDefaultAddressId = Component =>
  graphql(GET_DEFAULT_ADDRESS_ID_QUERY, {
    options: props => {
      return { variables: { userId: props.currentUser && props.currentUser.id } };
    },
    props({ data: { loading, error, getDefaultAddressId, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, getDefaultAddressId, subscribeToMore };
    }
  })(Component);
export const withAddresses = Component =>
  graphql(ADDRESSES_QUERY, {
    options: props => {
      return { variables: { id: props.currentUser && props.currentUser.id } };
    },
    props({ data: { loading, error, addresses, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, addresses, subscribeToMore };
    }
  })(Component);

// Mutation
export const withAddOrEditAddress = Component =>
  graphql(ADD_OR_EDIT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      addOrEditAddresses: async values => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          values.userId = currentUser && currentUser.id;
          values.pinCode = Number(values.pinCode);
          const {
            data: { addOrEditAddress }
          } = await mutate({
            variables: {
              input: values
            }
          });
          Message.destroy();
          Message.success(addOrEditAddress);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withSetDefaultAddress = Component =>
  graphql(SET_DEFAULT_ADDRESS, {
    props: ({ mutate, ownProps: { currentUser } }) => ({
      setDefaultAddress: async id => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              userId: currentUser && currentUser.id,
              id
            }
          });
          Message.destroy();
          Message.success('Default Changed!');
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withDeleteAddress = Component =>
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
        });
        Message.warning('Address deleted.');
      }
    })
  })(Component);
