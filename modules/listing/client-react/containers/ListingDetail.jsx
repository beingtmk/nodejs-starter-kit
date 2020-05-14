import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';

import { withListing } from './ListingOperations';

import ListingDetailView from '../components/ListingDetailView';

const ListingDetail = props => {
  console.log('props', props);
  return <ListingDetailView {...props} />;
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};

export default compose(
  withListing,
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  graphql(USER_QUERY, {
    options: props => {
      let id = 0;
      id = props.listing ? props.listing.userId : id;
      return {
        variables: { id: id }
      };
    },
    props({ data: { loading, error, user } }) {
      if (error) throw new Error(error);
      return { loading, user };
    }
  })
)(ListingDetail);
