import { Message } from '@gqlapp/look-client-react';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';

import { removeTypename, PLATFORM } from '@gqlapp/core-common';
import settings from '@gqlapp/config';

// Query
import DYNAMIC_CAROUSEL_QUERY from '../../graphql/DynamicCarouselQuery.graphql';
import DYNAMIC_CAROUSELS_QUERY from '../../graphql/DynamicCarouselsQuery.graphql';

// Mutation
import ADD_DYNAMIC_CAROUSEL from '../../graphql/AddDynamicCarousel.graphql';
import DELETE_DYNAMIC_CAROUSEL from '../../graphql/DeleteDynamicCarousel.graphql';
import EDIT_DYNAMIC_CAROUSEL from '../../graphql/EditDynamicCarousel.graphql';

// Subscription
import DYNAMIC_CAROUSEL_SUBSCRIPTION from '../../graphql/DynamicCarouselSubscription.graphql';

// Filters
import DYNAMIC_CAROUSEL_STATE_QUERY from '../../graphql/DynamicCarouselStateQuery.client.graphql';
import DYNAMIC_CAROUSEL_UPDATE_FILTER from '../../graphql/DynamicCarouselUpdateFilter.client.graphql';
import DYNAMIC_CAROUSEL_ORDER_BY from '../../graphql/UpdateOrderByDynamiceCarousel.client.graphql';

import ROUTES from '../../routes';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withDynamicCarousels = Component =>
  graphql(DYNAMIC_CAROUSELS_QUERY, {
    options: ({ orderBy, filter }) => {
      // console.log(filter);
      return {
        fetchPolicy: 'network-only',
        variables: { limit: limit, after: 0, orderBy, filter }
      };
    },
    props: ({ data }) => {
      const { loading, error, dynamicCarousels, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.dynamicCarousels.totalCount;
            const newEdges = fetchMoreResult.dynamicCarousels.edges;
            const pageInfo = fetchMoreResult.dynamicCarousels.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.dynamicCarousels.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              dynamicCarousels: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Dynamic Carousel'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        dynamicCarousels,
        subscribeToMore,
        loadData,
        updateQueryListings: updateQuery
      };
    }
  })(Component);

export const withDynamicCarousel = Component =>
  graphql(DYNAMIC_CAROUSEL_QUERY, {
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
    props({ data: { loading, error, dynamicCarousel, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, dynamicCarousel, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withDeleteDynamicCarousel = Component =>
  graphql(DELETE_DYNAMIC_CAROUSEL, {
    props: ({ mutate }) => ({
      deleteDynamicCarousel: async id => {
        const {
          data: { deleteDynamicCarousel }
        } = await mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteDynamicCarousel: {
              id: id,
              __typename: 'DynamicCarousel'
            }
          }
        });
        if (deleteDynamicCarousel) Message.warning('Banner deleted.');
        else Message.warning('Try again!');
      }
    })
  })(Component);

export const withAddDynamicCarousel = Component =>
  graphql(ADD_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      addDynamicCarousel: async values => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addDynamicCarousel: {
                __typename: 'DynamicCarousel',
                ...values
              }
            }
          });

          Message.destroy();
          Message.success('Banner added.');
          history.push(`${ROUTES.adminPanel}`);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withEditDynamicCarousel = Component =>
  graphql(EDIT_DYNAMIC_CAROUSEL, {
    props: ({ ownProps: { history }, mutate }) => ({
      editDynamicCarousel: async values => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          // console.log('input', input);
          await mutate({
            variables: {
              input: values
            }
          });
          Message.destroy();
          Message.success('Changes Saved.');
          history.push(`${ROUTES.adminPanel}`);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

// Subscription
export const subscribeToDynamicCarousels = subscribeToMore =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddDynamicCarousels(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousels(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDynamicCarousels(prev, node.id);
      }
      return newResult;
    }
  });

function onAddDynamicCarousels(prev, node) {
  // console.log('prev', prev, node);
  if (prev.dynamicCarousels.edges.some(dC => node.id === dC.cursor)) {
    return update(prev, {
      dynamicCarousels: {
        totalCount: {
          $set: prev.dynamicCarousels.totalCount - 1
        },
        edges: {
          $set: prev.dynamicCarousels.edges
        }
      }
    });
  }

  const filteredListings = prev.dynamicCarousels.edges.filter(dC => dC.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'DynamicCarouselEdges'
  };

  return update(prev, {
    dynamicCarousels: {
      totalCount: {
        $set: prev.dynamicCarousels.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredListings]
      }
    }
  });
}

function onEditDynamicCarousels(prev, node) {
  const index = prev.dynamicCarousels.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ListingEdges'
  };
  if (index) {
    prev.dynamicCarousels.edges.splice(index, 1, edge);
    return update(prev, {
      dynamicCarousels: {
        edges: {
          $set: [...prev.dynamicCarousels]
        }
      }
    });
  }
}

const onDeleteDynamicCarousels = (prev, id) => {
  const index = prev.dynamicCarousels.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    dynamicCarousels: {
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

export const subscribeToDynamicCarousel = (subscribeToMore, history) =>
  subscribeToMore({
    document: DYNAMIC_CAROUSEL_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            dynamicCarouselUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'UPDATED') {
        newResult = onEditDynamicCarousel(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteDynamicCarousel(prev, node.id, history);
      }
      return newResult;
    }
  });

function onEditDynamicCarousel(prev, node) {
  return update(prev, {
    dynamicCarousel: {
      $set: node
    }
  });
}

const onDeleteDynamicCarousel = (prev, id, history) => {
  if (prev.dynamicCarousel.id === id) {
    Message.error('Banner was deleted');
    history.push(`${ROUTES.adminPanel}`);
  }
};

// Filters
export const withDynamicCarouselState = Component =>
  graphql(DYNAMIC_CAROUSEL_STATE_QUERY, {
    props({ data: { dynamicCarouselState } }) {
      return { ...removeTypename(dynamicCarouselState) };
    }
  })(Component);

export const withDynamicCarouselFilterUpdating = Component =>
  graphql(DYNAMIC_CAROUSEL_UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onLabelChange(label) {
        mutate({ variables: { filter: { label } } });
      },
      onIsActiveChange(isActive) {
        // console.log(isActive);
        mutate({ variables: { filter: { isActive } } });
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

export const withDynamicCarouselOrderByUpdating = Component =>
  graphql(DYNAMIC_CAROUSEL_ORDER_BY, {
    props: ({ mutate }) => ({
      onDynamicCarouselOrderBy: orderBy => {
        console.log('orderBy', orderBy);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);
