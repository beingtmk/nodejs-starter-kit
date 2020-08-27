import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import { USERS_QUERY } from '@gqlapp/user-client-react/graphql/UsersQuery.graphql';
import ROUTES from '../routes';

// import { withReview, withCurrentUser, withEditReview, updateReviewState } from './ReviewOperations';

import EditReviewView from '../components/EditReviewView.web';
// import { useReviewWithSubscription } from './withSubscriptions';
import REVIEW_QUERY from '../graphql/ReviewQuery.graphql';
import EDIT_REVIEW from '../graphql/EditReview.graphql';

const EditReview = props => {
  const { updateQuery, subscribeToMore, review, history } = props;
  // const reviewsUpdated = useReviewWithSubscription(subscribeToMore, review && review.id);

  // useEffect(() => {
  //   if (reviewsUpdated) {
  //     updateReviewState(reviewsUpdated, updateQuery, history);
  //   }
  // });
  console.log('props', props);
  return <EditReviewView {...props} />;
};

EditReview.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  review: PropTypes.object,
  history: PropTypes.object
};

export default compose(
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
  }),
  graphql(EDIT_REVIEW, {
    props: ({
      ownProps: {
        history,
        navigation
        // currentUser: { role }
      },
      mutate
    }) => ({
      editReview: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          values = removeTypename(values);
          const input = {
            modal: 'event_review',
            modalId: 107,
            moduleId: 1,
            review: {
              id: values.id,
              userId: values.userId,
              rating: values.rating,
              feedback: values.feedback,
              isActive: values.isActive
            }
          };
          // input.reviewImages = Object.values(input.reviewImages);

          console.log('input', input);
          await mutate({
            variables: {
              input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          if (history) {
            return history.push(ROUTES.adminPanel);
          }
          // if (navigation) {
          //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
          //   else return navigation.navigate('MyReviews');
          // }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  // withCurrentUser, withReview, withEditReview,
  translate('review')
)(EditReview);
