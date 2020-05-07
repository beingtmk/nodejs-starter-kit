import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_LISTING from '../graphql/AddListing.graphql';

import AddListingView from '../components/AddListingView.web';

const AddListing = props => {
  console.log('props', props);
  return <AddListingView {...props} />;
};

export default compose(
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
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  translate('events')
)(AddListing);
