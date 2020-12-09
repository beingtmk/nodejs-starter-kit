import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import { withListing, withCurrentUser, withEditListing } from './ListingOperations';

import EditListingView from '../components/EditListingView.web';
import { subscribeToListing } from './ListingSubscriptions';
import { removeEmpty } from '../components/functions';

const EditListing = props => {
  const { subscribeToMore, listing, history, editListing } = props;

  useEffect(() => {
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    return () => subscribe();
  });

  const handleSubmit = values => {
    console.log(removeEmpty(values));
    try {
      editListing(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return listing ? <EditListingView onSubmit={handleSubmit} {...props} /> : null;
};

EditListing.propTypes = {
  subscribeToMore: PropTypes.func,
  editListing: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object
};

export default compose(withCurrentUser, withListing, withEditListing, translate('listing'))(EditListing);
