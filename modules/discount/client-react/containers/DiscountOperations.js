import { graphql } from 'react-apollo';
import { PLATFORM } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';

// Query
import MODAL_DISCOUNT_QUERY from '../graphql/ModalDiscountQuery.graphql';
import DISCOUNTS_QUERY from '../graphql/DiscountsQuery.graphql';

// Mutation
import ADD_DISCOUNT from '../graphql/AddDiscount.graphql';
import EDIT_DISCOUNT from '../graphql/EditDiscount.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withModalDiscount = Component =>
  graphql(MODAL_DISCOUNT_QUERY, {
    options: ({ modalId, modalName }) => {
      return {
        variables: { modalId, modalName }
      };
    },
    props({ data: { loading, error, modalDiscount, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, modalDiscount, discountSubscribeToMore: subscribeToMore, updateQuery };
    }
  })(Component);

export const withDiscounts = Component =>
  graphql(DISCOUNTS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, discounts, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.discounts.totalCount;
            const newEdges = fetchMoreResult.discounts.edges;
            const pageInfo = fetchMoreResult.discounts.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.discounts.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              discounts: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Discounts'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, discounts, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

// Mutation
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
          Message.destroy();
          Message.error("Couldn't perform the action");
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
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);
