import { graphql } from 'react-apollo';
import { Message } from '@gqlapp/look-client-react';

import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import settings from '@gqlapp/config';

// Query
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ORDER_QUERY from '../graphql/OrderQuery.graphql';
import ORDERS_STATE_QUERY from '../graphql/OrdersStateQuery.client.graphql';
import ORDERS_QUERY from '../graphql/OrdersQuery.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';
import ORDER_STATES from '../graphql/OrderStatesQuery.graphql';

// Mutation
import ADD_TO_CART from '../graphql/AddToCart.graphql';
import EDIT_ORDERDETAIL from '../graphql/EditOrderDetail.graphql';
import DELETE_CART_ITEM from '../graphql/DeleteCartItem.graphql';
import DELETE_ORDER from '../graphql/DeleteOrder.graphql';
import PATCH_ORDER_STATE from '../graphql/PatchOrderState.graphql';
import PATCH_ADDRESS from '../graphql/PatchAddress.graphql';
import COMPLETED_MAIL from '../graphql/OrderStatusMail.graphql';

// Filter
import UPDATE_ORDER_BY_ORDER from '../graphql/UpdateOrderByOrder.client.graphql';
import UPDATE_ORDER_FILTER from '../graphql/UpdateOrderFilter.client.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withOrdersState = Component =>
  graphql(ORDERS_STATE_QUERY, {
    props({ data: { ordersState, loading } }) {
      return { ...removeTypename(ordersState), loadingState: loading };
    }
  })(Component);

export const withCurrentUser = Component =>
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  })(Component);

export const withOrder = Component =>
  graphql(ORDER_QUERY, {
    options: props => {
      // console.log(props);
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, order, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, order, subscribeToMore, updateQuery };
    }
  })(Component);

export const withOrders = Component =>
  graphql(ORDERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, orders, fetchMore, subscribeToMore, updateQuery, refetch } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.orders.totalCount;
            const newEdges = fetchMoreResult.orders.edges;
            const pageInfo = fetchMoreResult.orders.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.orders.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              orders: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Orders'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, orders, ordersSubscribeToMore: subscribeToMore, loadData, updateQuery, refetch };
    }
  })(Component);

export const withGetCart = Component =>
  graphql(GET_CART_QUERY, {
    options: ({ currentUser }) => {
      return {
        variables: { userId: currentUser && currentUser.id },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  })(Component);

export const withOrderStates = Component =>
  graphql(ORDER_STATES, {
    props({ data: { loading, error, orderStates, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { orderStatesLoading: loading, orderStates, subscribeToMore, refetch };
    }
  })(Component);

// Mutation
export const withAddToCart = Component =>
  graphql(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: async input => {
        await mutate({
          variables: {
            input
          }
        });
      }
    })
  })(Component);

export const withEditOrderDetail = Component =>
  graphql(EDIT_ORDERDETAIL, {
    props: ({ mutate }) => ({
      editOrderDetail: async input => {
        const {
          data: { editOrderDetail }
        } = await mutate({
          variables: { input }
        });

        return editOrderDetail;
      }
    })
  })(Component);

export const withDeleteCartItem = Component =>
  graphql(DELETE_CART_ITEM, {
    props: ({ mutate }) => ({
      deleteOrderDetail: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteOrderDetail: {
              id: id,
              __typename: 'OrderDetail'
            }
          }
        });
      }
    })
  })(Component);

export const withDeleteOrder = Component =>
  graphql(DELETE_ORDER, {
    props: ({ mutate }) => ({
      deleteOrder: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteOrder: {
              id: id,
              __typename: 'Order'
            }
          }
        });
      }
    })
  })(Component);

export const withPatchOrderState = Component =>
  graphql(PATCH_ORDER_STATE, {
    props: ({ mutate }) => ({
      patchOrderState: async (orderId, state) => {
        const {
          data: { patchOrderState }
        } = await mutate({
          variables: {
            orderId,
            state
          }
        });
        return patchOrderState;
      }
    })
  })(Component);

export const withPatchAddress = Component =>
  graphql(PATCH_ADDRESS, {
    props: ({ mutate, ownProps: { getCart } }) => ({
      patchAddress: async addressId => {
        // console.log('mutation start', id);
        const {
          data: { patchAddress }
        } = await mutate({
          variables: {
            cartId: getCart && getCart.id,
            addressId
          }
        });
        Message.destroy();
        return patchAddress && Message.success('Address updated') && patchAddress;
      }
    })
  })(Component);

export const withOrderStatusMail = Component =>
  graphql(COMPLETED_MAIL, {
    props: ({ mutate }) => ({
      orderStatusMail: async (orderId, note) => {
        // console.log('mutation start', note);
        const {
          data: { orderStatusMail }
        } = await mutate({
          variables: {
            orderId,
            note
          }
        });
        Message.destroy();
        return orderStatusMail ? Message.success('Mail sent.') : Message.error('Please try again.');
      }
    })
  })(Component);

// Filter
export const withOrderByUpdating = Component =>
  graphql(UPDATE_ORDER_BY_ORDER, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withFilterUpdating = Component =>
  graphql(UPDATE_ORDER_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        // console.log("searchtext", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onStateChange(state) {
        mutate({ variables: { filter: { state } } });
      },
      onUserStateChange(consumerId, state) {
        // console.log('consumerId, state', consumerId, state);
        mutate({ variables: { filter: { consumerId, state } } });
      },
      onFiltersRemove(filter, orderBy) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);
