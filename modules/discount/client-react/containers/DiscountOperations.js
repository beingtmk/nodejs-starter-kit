import { graphql } from 'react-apollo';
import { message } from 'antd';

// Query
import MODAL_DISCOUNT_QUERY from '../graphql/ModalDiscountQuery.graphql';

// Mutation
import ADD_DISCOUNT from '../graphql/AddDiscount.graphql';
import EDIT_DISCOUNT from '../graphql/EditDiscount.graphql';

export const withModalDiscount = Component =>
  graphql(MODAL_DISCOUNT_QUERY, {
    options: ({ modalId, modalName }) => {
      return {
        variables: { modalId, modalName }
      };
    },
    props({ data: { loading, error, modalDiscount, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, modalDiscount, subscribeToMore, updateQuery };
    }
  })(Component);

export const withAddDiscount = Component =>
  graphql(ADD_DISCOUNT, {
    props: ({ mutate }) => ({
      addDiscount: async values => {
        try {
          const {
            data: { id }
          } = await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addDiscount: {
                __typename: 'Discount',
                ...values
              }
            }
          });
          return id;
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withEditDiscount = Component =>
  graphql(EDIT_DISCOUNT, {
    props: ({ mutate }) => ({
      editDiscount: async input => {
        try {
          await mutate({
            variables: {
              input: input
            }
          });
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
