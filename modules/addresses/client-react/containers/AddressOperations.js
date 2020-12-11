import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';

// Query
import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';

// Mutation
import ADD_OR_EDIT_ADDRESS from '../graphql/AddOrEditAddress.graphql';
import DELETE_ADDRESS from '../graphql/DeleteAddress.graphql';

// Query
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
