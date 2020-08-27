import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_REVIEW from '../graphql/AddReview.graphql';
import AddReviewView from '../components/AddReviewView.web';

import ROUTES from '../routes';

export interface AddReviewProps {
  t: TranslateFunction;
  loading: boolean;
  addReview: () => null;
}

const AddReview: React.FC<AddReviewProps> = props => {
  return <AddReviewView {...props} />;
};

export default compose(
  graphql(ADD_REVIEW, {
    props: ({ ownProps: { match, navigation, history }, mutate }) => ({
      addReview: async values => {
        const input = {
          modal: 'event_review',
          moduleId: 1,
          review: {
            userId: values.userId,
            rating: values.rating,
            feedback: values.feedback
          }
        };
        console.log(input);
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
          history.push(ROUTES.adminPanel);
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  // graphql(CURRENT_USER_QUERY, {
  //   props({ data: { loading, error, currentUser } }) {
  //     if (error) throw new Error(error);
  //     return {
  //       loading,
  //       currentUser,
  //     };
  //   },
  // }),
  translate('review')
)(translate('user')(AddReview));
