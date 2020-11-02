import { graphql } from 'react-apollo';

// Query
import MODAL_DISCOUNT_QUERY from '../graphql/ModalDiscountQuery.graphql';

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

export const withDiscount = Component => console.log('bleh', Component);
