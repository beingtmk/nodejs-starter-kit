import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename, log } from '@gqlapp/core-common';
import update from 'immutability-helper';
import { message } from 'antd';

import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
// import LISTINGSCARD_QUERY from '../graphql/ListingsCardQuery.graphql';

// import LISTS_STATE_QUERY from '../graphql/ListsStateQuery.client.graphql';
// import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';
// import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
// import TOGGLE_LISTING_IS_FEATURED from '../graphql/ToggleListingIsFeature.graphql';
// import TOGGLE_LISTING_STATUS from '../graphql/ToggleListingStatus.graphql';
// import DUPLICATE_LIST from '../graphql/DuplicateList.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const withListings = Component =>
  graphql(LISTINGS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, listings, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.listings.totalCount;
            const newEdges = fetchMoreResult.listings.edges;
            const pageInfo = fetchMoreResult.listings.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.listings.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              listings: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Listings'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, listings, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

const updateListingsState = (ListingsUpdated, updateQuery) => {
  const { mutation, node } = ListingsUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return onAddListing(prev, node);
      case 'DELETED':
        return onDeleteListing(prev, node.id);
      case 'UPDATED':
        return onDeleteListing(prev, node.id);
      default:
        return prev;
    }
  });
};

function onAddListing(prev, node) {
  // check if it is duplicate
  console.log('node', node);
  console.log('prev', prev);
  if (prev.listings.edges.some(listing => listing.node.id === node.id)) {
    return prev;
  }

  return update(prev, {
    listings: {
      $set: [...prev.listings, node]
    }
  });
}

const onDeleteListing = (prev, id) => {
  const index = prev.listings.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    listings: {
      totalCount: {
        $set: prev.listings.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
export {
  // withListingsState,
  withListings,
  // withCardListings,
  // withListingsDeleting,
  // withOrderByUpdating,
  // withFilterUpdating,
  // withListingStatusToggling,
  // withListingFeaturedToggling,
  // withListingDuplicating,
  updateListingsState
};
