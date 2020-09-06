import { graphql } from 'react-apollo';
import { message } from 'antd';
import update from 'immutability-helper';

import { PLATFORM, removeTypename } from '@gqlapp/core-common';

// Query
import REVIEW_QUERY from '../graphql/ReviewQuery.graphql';
import REVIEWS_QUERY from '../graphql/ReviewsQuery.graphql';
import RATING_QUERY from '../graphql/RatingQuery.graphql';

// Mutation
import ADD_REVIEW from '../graphql/AddReview.graphql';
import EDIT_REVIEW from '../graphql/EditReview.graphql';
import DELETE_REVIEW from '../graphql/DeleteReview.graphql';

// Subscription
import REVIEWS_SUBSCRIPTION from '../graphql/ReviewSubscription.graphql';

// Filter
import UPDATE_REVIEWS_FILTER from '../graphql/UpdateReviewsFilter.client.graphql';
import REVIEWS_STATE_QUERY from '../graphql/ReviewsStateQuery.client.graphql';
import UPDATE_REVIEWS_ORDER_BY from '../graphql/UpdateReviewsOrderBy.client.graphql';

import settings from '../../../../settings';
import ROUTES from '../routes';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export const withRating = Component =>
  graphql(RATING_QUERY, {
    options: ({ filter }) => {
      // console.log('filter', filter);
      return {
        variables: {
          modalName: filter.modalName,
          modalId: filter.modalId
        },
        fetchPolicy: 'network-only'
      };
    },
    props({ data: { loading, error, ratingAverage, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, ratingAverage, subscribeToMore, updateQuery };
    }
  })(Component);

export const withReview = Component =>
  graphql(REVIEW_QUERY, {
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
    props({ data: { loading, error, review, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, review, subscribeToMore, updateQuery };
    }
  })(Component);

export const withReviews = Component =>
  graphql(REVIEWS_QUERY, {
    options: ({ orderBy, filter }) => {
      // console.log('filter', filter);
      return {
        variables: {
          limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, reviews, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.reviews.totalCount;
            const newEdges = fetchMoreResult.reviews.edges;
            const pageInfo = fetchMoreResult.reviews.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.reviews.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              reviews: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Review'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error);
      }
      return { loading, reviews, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withReviewsDeleting = Component =>
  graphql(DELETE_REVIEW, {
    props: ({ mutate }) => ({
      deleteReview: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteReview: {
              id,
              __typename: 'Review'
            }
          }
        });
        message.error('Review deleted.');
      }
    })
  })(Component);

export const withReviewAdding = Component =>
  graphql(ADD_REVIEW, {
    props: ({ ownProps: { history }, mutate }) => ({
      addReview: async values => {
        const input = {
          modalName: values.modalName,
          modalId: values.modalId,
          review: {
            userId: values.userId,
            rating: values.rating,
            feedback: values.feedback
          }
        };
        // console.log(input);
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addReview: {
                __typename: 'Review',
                ...input
              }
            }
          });

          message.destroy();
          message.success('Review added.');
          // console.log('addreview', values);
          history && history.push(ROUTES.adminPanel);
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withReviewEditing = Component =>
  graphql(EDIT_REVIEW, {
    props: ({ mutate }) => ({
      editReview: async input => {
        await mutate({
          variables: {
            input
          }
        });
      }
    })
  })(Component);

export const subscribeToReviews = subscribeToMore =>
  subscribeToMore({
    document: REVIEWS_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            reviewUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddReviews(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditReviews(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteReviews(prev, node.id);
      }
      return newResult;
    }
  });

function onAddReviews(prev, node) {
  // console.log('prev', prev, node);
  if (prev.reviews.edges.some(review => node.id === review.cursor)) {
    return update(prev, {
      reviews: {
        totalCount: {
          $set: prev.reviews.totalCount - 1
        },
        edges: {
          $set: prev.reviews.edges
        }
      }
    });
  }

  const filteredReviews = prev.reviews.edges.filter(review => review.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ReviewEdges'
  };

  return update(prev, {
    reviews: {
      totalCount: {
        $set: prev.reviews.totalCount + 1
      },
      edges: {
        $set: [edge, ...filteredReviews]
      }
    }
  });
}

function onEditReviews(prev, node) {
  const index = prev.reviews.edges.findIndex(x => x.id === node.id);
  prev.reviews.edges.splice(index, 1, node);

  return update(prev, {
    reviews: {
      $set: [...prev.reviews]
    }
  });
}

const onDeleteReviews = (prev, id) => {
  // console.log('called', id);
  const index = prev.reviews.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    reviews: {
      totalCount: {
        $set: prev.reviews.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};

// Filter
export const withReviewsStateQuery = Component =>
  graphql(REVIEWS_STATE_QUERY, {
    props({ data: { reviewsState } }) {
      return removeTypename(reviewsState);
    }
  })(Component);

export const withReviewsOrderByUpdating = Component =>
  graphql(UPDATE_REVIEWS_ORDER_BY, {
    props: ({ mutate }) => ({
      onReviewsOrderBy: orderBy => {
        // console.log('orderBy', orderBy);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

export const withUpdateReviewsFilter = Component =>
  graphql(UPDATE_REVIEWS_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      },
      onModalNameChange(modalName) {
        mutate({ variables: { filter: { modalName } } });
      }
    })
  })(Component);

// export const with = Component =>
// (Component)
