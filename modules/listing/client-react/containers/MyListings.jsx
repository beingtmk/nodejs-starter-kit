import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';

import MyListingsView from '../components/MyListingsView';

import MY_LISTINGS_QUERY from '../graphql/MyListingsQuery.graphql';
import DELETE_LISTING from '../graphql/DeleteListing.graphql';
// import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';

const MyListings = props => {
  console.log('props', props);
  return <MyListingsView {...props} />;
};

export default compose(
  graphql(MY_LISTINGS_QUERY, {
    props({ data: { loading, error, userListings, subscribeToMore, updateQuery, refetch } }) {
      if (error) throw new Error(error);
      return { loading, userListings, subscribeToMore, updateQuery, refetch };
    }
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }) => ({
      deleteListing: async id => {
        message.loading('Please wait...', 0);
        try {
          const {
            data: { deleteListing }
          } = await mutate({ variables: { id } });

          if (deleteListing.errors) {
            return { errors: deleteListing.errors };
          }
          message.destroy();
          message.warning('Listing deleted.');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(MyListings);
