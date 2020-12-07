import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withAddDiscount } from '@gqlapp/discount-client-react/containers/DiscountOperations';

import ROUTES from '../routes';
import AddListingView from '../components/AddListingView.web';
import { withAddListing, withCurrentUser } from './ListingOperations';

const AddListing = props => {
  const { addListing, addDiscount, history } = props;
  const handleSubmit = async (values, discountValues) => {
    console.log(values);
    Message.destroy();
    Message.loading('Please wait...', 0);
    try {
      delete values.id;
      delete values.listingFlags.id;
      delete values.listingOptions.id;
      delete values.listingDetail.id;
      const id = await addListing(values);
      console.log(id, discountValues);
      if (id && discountValues) {
        console.log(discountValues);
        delete discountValues.id;
        delete discountValues.discountDuration.id;
        await addDiscount({ modalId: id, ...discountValues });
      }
      Message.destroy();
      Message.success('Listing added.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <AddListingView {...props} onSubmit={handleSubmit} />;
};

AddListing.propTypes = {
  addListing: PropTypes.func,
  addDiscount: PropTypes.func,
  history: PropTypes.object
};

export default compose(withAddListing, withAddDiscount, withCurrentUser, translate('listing'))(AddListing);
