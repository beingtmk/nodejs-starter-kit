import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import update from 'immutability-helper';
import { message } from 'antd';

// Query
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import LISTING_QUERY from '../graphql/ListingQuery.graphql';
import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import MY_LISTINGS_QUERY from '../graphql/MyListingsQuery.graphql';
import MY_LISTINGS_BOOKMARK_QUERY from '../graphql/MyListingsBookmark.graphql';
import LISTING_BOOKMARK_STATUS from '../graphql/ListingBookmarkStatus.graphql';
import LISTINGS_STATE_QUERY from '../graphql/ListingsStateQuery.client.graphql';

// Mutation
import ADD_LISTING from '../graphql/AddListing.graphql';
import EDIT_LISTING from '../graphql/EditListing.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
import TOOGLE_LISTING_BOOKMARK from '../graphql/ToggleListingBookmark.graphql';

// Filter
import UPDATE_ORDER_BY_LISTING from '../graphql/UpdateOrderByListing.client.graphql';
import UPDATE_LISTING_FILTER from '../graphql/UpdateListingFilter.client.graphql';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withListingsState = Component =>
  graphql(LISTINGS_STATE_QUERY, {
    props({ data: { listingsState, loading } }) {
      return { ...removeTypename(listingsState), loadingState: loading };
    }
  })(Component);

export const withCurrentUser = Component =>
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  })(Component);

export const withListings = Component =>
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

export const updateListingsState = (ListingsUpdated, updateQuery) => {
  const { mutation, node } = ListingsUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return onAddListings(prev, node);
      case 'DELETED':
        return onDeleteListings(prev, node.id);
      case 'UPDATED':
        return onDeleteListings(prev, node.id);
      default:
        return prev;
    }
  });
};

function onAddListings(prev, node) {
  // check if it is duplicate
  // console.log('prev', prev.listings.edges.some(listing => listing.node.id === node.id));
  if (prev.listings.edges.some(listing => listing.node.id === node.id)) {
    return prev;
  }

  return update(prev, {
    listings: {
      $set: [...prev.listings, node]
    }
  });
}

const onDeleteListings = (prev, id) => {
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

export const updateMyListingsState = (ListingsUpdated, updateQuery) => {
  const { mutation, node } = ListingsUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return onAddMyListing(prev, node);
      case 'DELETED':
        return onDeleteMyListing(prev, node.id);
      case 'UPDATED':
        return onDeleteMyListing(prev, node.id);
      default:
        return prev;
    }
  });
};

const onAddMyListing = (prev, node) => {
  // ignore if duplicate
  console.log('prev', prev);
  if (prev.userListings.edges.some(listing => node.id === listing.node.id)) {
    return prev;
  }
  return update(prev, {
    userListings: {
      $set: [node, ...prev.userListings]
    }
  });
};

const onDeleteMyListing = (prev, id) => {
  const index = prev.userListings.findIndex(list => list.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    userListings: {
      $splice: [[index, 1]]
    }
  });
};

export const updateListingState = (ListingUpdated, updateQuery, history) => {
  const { mutation, node } = ListingUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'UPDATED':
        return onAddListing(prev, node);
      case 'DELETED':
        return onDeleteListing(history);
      default:
        return prev;
    }
  });
};

function onAddListing(prev, node) {
  // check if it is duplicate

  return update(prev, {
    listing: {
      $set: node
    }
  });
}
const onDeleteListing = history => {
  message.info('This listing has been deleted!');
  message.warn('Redirecting to all listings');
  return history.push('./listing_catalogue');
};

export const updateMyListingsBookmarkState = (ListingsUpdated, updateQuery) => {
  const { mutation, node } = ListingsUpdated;
  updateQuery(prev => {
    console.log('prev', prev, 'node', node);
    switch (mutation) {
      case 'CREATED':
        return onAddMyListingsBookmark(prev, node);
      case 'DELETED':
        return onDeleteMyListingBookmark(prev, node.id);
      case 'UPDATED':
        return onDeleteMyListingBookmark(prev, node.id);
      default:
        return prev;
    }
  });
};

const onAddMyListingsBookmark = (prev, node) => {
  // ignore if duplicate
  console.log('prev', prev, 'node', node);
  if (prev.myListingsBookmark.edges.some(listing => node.id === listing.node.id)) {
    return prev;
  }
  // node.node = node;
  // node.cursor = prev.myListingsBookmark.pageInfo.endCursor + 1;
  return update(prev, {
    myListingsBookmark: {
      pageInfo: {
        endCursor: {
          $set: prev.myListingsBookmark.pageInfo.endCursor + 1
        }
      },
      edges: {
        $push: [
          {
            cursor: prev.myListingsBookmark.pageInfo.endCursor + 1,
            node,
            __typename: 'ListingEdges'
          }
        ]
      }
    }
  });
};

const onDeleteMyListingBookmark = (prev, id) => {
  const index = prev.myListingsBookmark.edges.findIndex(list => list.node.id === id);
  console.log('indes', index);
  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    myListingsBookmark: {
      totalCount: {
        $set: prev.myListingsBookmark.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
export const withListingsDeleting = Component =>
  graphql(DELETE_LISTING, {
    props: ({ mutate }) => ({
      deleteListing: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteListing: {
              id: id,
              __typename: 'Listing'
            }
          },

          update: (cache, { data: { deleteListing } }) => {
            // Get previous listings from cache
            const prevListings = cache.readQuery({
              query: LISTINGS_QUERY,
              variables: {
                limit,
                after: 0
              }
            });

            const newListListings = onDeleteListing(prevListings, deleteListing.id);

            // Write listings to cache
            cache.writeQuery({
              query: LISTINGS_QUERY,
              variables: {
                limit,
                after: 0
              },
              data: {
                listings: {
                  ...newListListings.listings,
                  __typename: 'Listings'
                }
              }
            });
          }
        });
        message.warning('Listing deleted.');
      }
    })
  })(Component);

export const withMyListing = Component =>
  graphql(MY_LISTINGS_QUERY, {
    props({ data: { loading, error, userListings, subscribeToMore, updateQuery, refetch } }) {
      if (error) throw new Error(error);
      return { loading, userListings, subscribeToMore, updateQuery, refetch };
    }
  })(Component);

export const withAddListing = Component =>
  graphql(ADD_LISTING, {
    props: ({ ownProps: { history }, mutate }) => ({
      addListing: async values => {
        console.log('addlisting', values);
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addListing: {
                __typename: 'Listing',
                ...values
              }
            }
          });

          message.destroy();
          message.success('Listing added.');
          history.push('/listing_catalogue');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withListing = Component =>
  graphql(LISTING_QUERY, {
    options: props => {
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
    props({ data: { loading, error, listing, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, listing, subscribeToMore, updateQuery };
    }
  })(Component);

export const withEditListing = Component =>
  graphql(EDIT_LISTING, {
    props: ({
      ownProps: {
        history,
        navigation,
        currentUser: { role }
      },
      mutate
    }) => ({
      editListing: async input => {
        try {
          message.destroy();
          message.loading('Please wait...', 0);
          console.log('input', input);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          if (history) {
            if (role === 'admin') return history.push('/listings');
            else return history.push('/my-listings');
          }
          if (navigation) {
            if (role === 'admin') return navigation.navigate('ListingCatalogue');
            else return navigation.navigate('MyListings');
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withMyListingsBookmark = Component =>
  graphql(MY_LISTINGS_BOOKMARK_QUERY, {
    options: props => {
      console.log('props from operation', props.currentUser.id);
      return {
        variables: {
          userId: props.currentUser && props.currentUser.id,
          limit: limit,
          after: 0
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, myListingsBookmark, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.myListingsBookmark;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.myListingsBookmark, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              myListingsBookmark: displayedEdges
            };
          }
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        myListingsBookmark,
        subscribeToMore,
        loadData,
        updateQuery
      };
    }
  })(Component);

export const withToogleListingBookmark = Component =>
  graphql(TOOGLE_LISTING_BOOKMARK, {
    props: ({ mutate }) => ({
      addOrRemoveListingBookmark: async (listingId, userId) => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const {
            data: { addOrRemoveListingBookmark }
          } = await mutate({
            variables: { listingId, userId }
          });

          message.destroy();
          message.success(addOrRemoveListingBookmark);
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withListingBookmarkStatus = Component =>
  graphql(LISTING_BOOKMARK_STATUS, {
    options: props => {
      let id;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      console.log('props LO', props, 'id', id);
      return {
        variables: {
          listingId: Number(id || (props.listing && props.listing.id)),
          userId: props.currentUser && props.currentUser.id
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, listingBookmarkStatus } }) {
      if (error) throw new Error(error);
      return { loading, listingBookmarkStatus };
    }
  })(Component);

// Filter
export const withOrderByUpdating = Component =>
  graphql(UPDATE_ORDER_BY_LISTING, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        // console.log('orderby', mutate);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withFilterUpdating = Component =>
  graphql(UPDATE_LISTING_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        // console.log("searchtext", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onUpperCostChange(cost) {
        mutate({ variables: { filter: { upperCost: cost } } });
      },
      onLowerCostChange(cost) {
        mutate({ variables: { filter: { lowerCost: cost } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      },
      onIsFeaturedChange(isFeatured) {
        mutate({ variables: { filter: { isFeatured } } });
      },
      onIsDiscount(isDiscount) {
        mutate({ variables: { filter: { isDiscount } } });
      },
      onIsNewChange(isNew) {
        mutate({ variables: { filter: { isNew } } });
      },
      onFiltersRemove(filter) {
        mutate({
          variables: {
            filter
          }
        });
      }
    })
  })(Component);
