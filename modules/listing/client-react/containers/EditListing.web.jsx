import React from 'react';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

import { withListing, withEditListing } from './ListingOperations';

import EditListingView from '../components/EditListingView.web';

const EditListing = props => {
  console.log('props', props);
  return <EditListingView {...props} />;
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  withListing,
  withEditListing,
  translate('listing')
)(EditListing);
