import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

// import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserId.graphql';
import LISTING_QUERY from '../graphql/ListingQuery.graphql';

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
  // graphql(CURRENT_USER_QUERY, {
  //   props({ data: { loading, error, currentUser } }) {
  //     if (error) throw new Error(error);
  //     return { currentUserLoading: loading, currentUser };
  //   }
  // }),
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
    props({ data: { loading, error, listing } }) {
      if (error) throw new Error(error);
      return { loading, listing };
    }
  })
)(ListingDetail);
