import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
// Query
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import LISTING_QUERY from '../graphql/ListingQuery.graphql';
import GET_LISTING_BRAND_LIST_QUERY from '../graphql/GetBrandListQuery.graphql';
import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import MY_LISTINGS_BOOKMARK_QUERY from '../graphql/MyListingsBookmark.graphql';
import LISTING_BOOKMARK_STATUS from '../graphql/ListingBookmarkStatus.graphql';
import CAN_USER_REVIEW from '../graphql/CanUserReview.graphql';
import LISTINGS_STATE_QUERY from '../graphql/ListingsStateQuery.client.graphql';

// Mutation
import ADD_LISTING from '../graphql/AddListing.graphql';
import DUPLICATE_LISTING from '../graphql/DuplicateListing.graphql';
import EDIT_LISTING from '../graphql/EditListing.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
import TOOGLE_LISTING_BOOKMARK from '../graphql/ToggleListingBookmark.graphql';
import SHARE_LISTING_BY_EMAIL from '../graphql/ShareListingByEmail.graphql';

// Filter
import UPDATE_ORDER_BY_LISTING from '../graphql/UpdateOrderByListing.client.graphql';
import UPDATE_LISTING_FILTER from '../graphql/UpdateListingFilter.client.graphql';

import ROUTES from '../routes';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withListingsState = Component =>
  graphql(LISTINGS_STATE_QUERY, {
    props({ data: { listingsState, loading } }) {
      const brand = listingsState && listingsState.filter.brand;
      if (listingsState && listingsState.filter) {
        delete listingsState.filter.brand;
      }
      const state = {
        ...removeTypename(listingsState)
      };
      if (state.filter) {
        state.filter.brand = brand;
      }
      return {
        ...state,
        loadingState: loading
      };
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
    options: ({ orderBy, addFilter, filter, match, navigation, ids }) => {
      return {
        variables: {
          limit: limit,
          after: 0,
          orderBy,
          filter: {
            ...addFilter,
            ...filter,
            categoryFilter: {
              categoryId: Number(
                (match ? match.params.cid : navigation && navigation.state.params.cid) ||
                  (filter && filter.categoryFilter && filter.categoryFilter.categoryId) ||
                  0
              ),
              allSubCategory: filter && filter.categoryFilter && filter.categoryFilter.allSubCategory
            }
          },
          ids
        },
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
        variables: { id: Number(id) || props.modalId }
      };
    },
    props({ data: { loading, error, listing, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, listing, subscribeToMore, updateQuery };
    }
  })(Component);

export const withGetBrandList = Component =>
  graphql(GET_LISTING_BRAND_LIST_QUERY, {
    props({ data: { loading, error, getBrandList, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, getBrandList, subscribeToMore, updateQuery };
    }
  })(Component);

export const withMyListingsBookmark = Component =>
  graphql(MY_LISTINGS_BOOKMARK_QUERY, {
    options: props => {
      // console.log('props from operation', props.currentUser.id);
      return {
        variables: {
          userId: props.currentUser && props.currentUser.id,
          limit: limit,
          after: 0,
          orderBy: props.orderBy && props.orderBy,
          filter: props.filter && props.filter
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

export const withListingBookmarkStatus = Component =>
  graphql(LISTING_BOOKMARK_STATUS, {
    options: props => {
      return {
        variables: {
          listingId: Number(props.listing && props.listing.id),
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

export const withCanUserReview = Component =>
  graphql(CAN_USER_REVIEW, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: {
          listingId: Number((props.listing && props.listing.id) || id),
          userId: props.currentUser && props.currentUser.id
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, canUserReview, subscribeToMore } }) {
      if (error) throw new Error(error);
      return {
        loading,
        canUserReview,
        canUserReviewsubscribeToMore: subscribeToMore
      };
    }
  })(Component);

// Mutation
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
          }
          // ,update: (cache, { data: { deleteListing } }) => {
          //   // Get previous listings from cache
          //   const prevListings = cache.readQuery({
          //     query: LISTINGS_QUERY,
          //     variables: {
          //       limit,
          //       after: 0
          //     }
          //   });

          //   const newListListings = onDeleteListing(prevListings, deleteListing.id);

          //   // Write listings to cache
          //   cache.writeQuery({
          //     query: LISTINGS_QUERY,
          //     variables: {
          //       limit,
          //       after: 0
          //     },
          //     data: {
          //       listings: {
          //         ...newListListings.listings,
          //         __typename: 'Listings'
          //       }
          //     }
          //   });
          // }
        });
        Message.warning('Listing deleted.');
      }
    })
  })(Component);

export const withAddListing = Component =>
  graphql(ADD_LISTING, {
    props: ({ mutate }) => ({
      addListing: async values => {
        try {
          const {
            data: { addListing: id }
          } = await mutate({
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
          return id;
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withDulicateListing = Component =>
  graphql(DUPLICATE_LISTING, {
    props: ({ mutate }) => ({
      duplicateListing: async id => {
        Message.loading('Please wait...', 0);
        try {
          Message.destroy();
          const {
            data: { duplicateListing }
          } = await mutate({
            variables: { id }
          });

          if (duplicateListing.errors) {
            return { errors: duplicateListing.errors };
          }
          Message.success('Duplicate listing created!');
          return duplicateListing;
        } catch (e) {
          Message.error("Couldn't perform the action");
          throw Error(e);
        }
      }
    })
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
          Message.destroy();
          Message.loading('Please wait...', 0);
          // console.log('input', input);
          await mutate({
            variables: {
              input: input
            }
          });
          Message.destroy();
          Message.success('Changes Saved.');
          if (history) {
            if (role === 'admin') return history.push(`${ROUTES.adminPanel}`);
            else return history.push(`${ROUTES.myListing}`);
          }
          if (navigation) {
            if (role === 'admin') return navigation.navigate('ListingCatalogue');
            else return navigation.navigate('MyListings');
          }
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withToogleListingBookmark = Component =>
  graphql(TOOGLE_LISTING_BOOKMARK, {
    props: ({ mutate }) => ({
      addOrRemoveListingBookmark: async (listingId, userId) => {
        Message.destroy();
        Message.loading('Please wait...', 0);
        try {
          const {
            data: { addOrRemoveListingBookmark }
          } = await mutate({
            variables: { listingId, userId }
          });

          Message.destroy();
          Message.success(addOrRemoveListingBookmark);
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withShareListingByEmail = Component =>
  graphql(SHARE_LISTING_BY_EMAIL, {
    props: ({ mutate }) => ({
      shareListingByEmail: async input => {
        const { data: shareListingByEmail } = await mutate({
          variables: { input }
        });
        return shareListingByEmail;
      }
    })
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
      onDiscountChange(discount) {
        mutate({ variables: { filter: { discount } } });
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
      onBrandChange(brand) {
        mutate({ variables: { filter: { brand } } });
      },
      onRatedChange(popularity) {
        mutate({ variables: { filter: { popularity } } });
      },
      onCategoryChange(categoryFilter) {
        // console.log(categoryFilter);
        mutate({
          variables: {
            filter: {
              categoryFilter: {
                categoryId: categoryFilter.categoryId,
                allSubCategory: categoryFilter.allSubCategory,
                __typename: 'CategoryFilter'
              }
            }
          }
        });
      },
      // onIsFeaturedChange(isFeatured) {
      //   mutate({ variables: { filter: { isFeatured } } });
      // },
      // onIsDiscount(isDiscount) {
      //   mutate({ variables: { filter: { isDiscount } } });
      // },
      // onIsNewChange(isNew) {
      //   mutate({ variables: { filter: { isNew } } });
      // },
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
