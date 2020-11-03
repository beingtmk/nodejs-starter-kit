import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import AddListingView from '../components/AddListingView.web';
import { withAddListing, withCurrentUser } from './ListingOperations';

const AddListing = props => {
  const { addListing /* addDiscountValues */ } = props;
  const handleSubmit = (values, discountValues) => {
    console.log(values, discountValues);
    try {
      delete values.id;
      delete values.listingFlags.id;
      delete values.listingOptions.id;
      delete values.listingDetail.id;
      addListing(values);
      // discountValues && addDiscountValues(discountValues);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <AddListingView {...props} onSubmit={handleSubmit} />;
};

AddListing.propTypes = {
  addListing: PropTypes.func,
  addDiscountValues: PropTypes.func
};

export default compose(withAddListing, withCurrentUser, translate('listing'))(AddListing);
