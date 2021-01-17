import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import AddListingView from '../components/AddListingView.web';
import { withAddListing, withCurrentUser } from './ListingOperations';
// import { removeEmpty } from '../components/functions';

const AddListing = props => {
  const { addListing, history } = props;
  const handleSubmit = async values => {
    console.log(values);
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      delete values.id;
      delete values.listingFlags.id;
      delete values.listingOptions.id;
      delete values.listingDetail.id;
      addListing(values);
      // addListing(removeEmpty(values));
    } catch (e) {
      throw Error(e);
    }
    Message.destroy();
    Message.success('Listing added.');
    history.push(`${ROUTES.adminPanel}`);
  };
  // console.log('props', props);
  return <AddListingView {...props} onSubmit={handleSubmit} />;
};

AddListing.propTypes = {
  addListing: PropTypes.func,
  history: PropTypes.object
};

export default compose(withAddListing, withCurrentUser, translate('listing'))(AddListing);
