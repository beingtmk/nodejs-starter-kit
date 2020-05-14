import React from 'react';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

import AddListingView from '../components/AddListingView.web';
import { withAddListing } from './ListingOperations';

const AddListing = props => {
  console.log('props', props);
  return <AddListingView {...props} />;
};

export default compose(
  withAddListing,
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  translate('listing')
)(AddListing);
