import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import AddListingView from '../components/AddListingView.web';
import { withAddListing, withCurrentUser } from './ListingOperations';

const AddListing = props => {
  const { addListing } = props;
  const handleSubmit = values => {
    try {
      addListing(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <AddListingView {...props} onSubmit={handleSubmit} />;
};

AddListing.propTypes = {
  addListing: PropTypes.func
};

export default compose(
  withAddListing,
  withCurrentUser,
  translate('listing')
)(AddListing);
