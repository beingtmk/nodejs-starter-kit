import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { MODAL } from '@gqlapp/review-common';
import { withEditDiscount } from '@gqlapp/discount-client-react/containers/DiscountOperations';

import { PropTypes } from 'prop-types';
import { withListing, withCurrentUser, withEditListing } from './ListingOperations';

import EditListingView from '../components/EditListingView.web';
import { subscribeToListing } from './ListingSubscriptions';

const EditListing = props => {
  const { subscribeToMore, listing, history, editListing, editDiscount } = props;

  useEffect(() => {
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    return () => subscribe();
  });

  const handleSubmit = (values, discountValues) => {
    try {
      if (!discountValues.id) {
        delete discountValues.id;
      }
      if (discountValues.discountDuration && !discountValues.discountDuration.id) {
        delete discountValues.discountDuration.id;
      }
      editListing(values);
      console.log(values, discountValues);
      discountValues && editDiscount({ modalId: values.id, ...discountValues });
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return listing ? (
    <EditListingView onSubmit={handleSubmit} modalName={MODAL[1].value} modalId={listing && listing.id} {...props} />
  ) : null;
};

EditListing.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  editListing: PropTypes.func,
  editDiscount: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object
};

export default compose(
  withCurrentUser,
  withListing,
  withEditDiscount,
  withEditListing,
  translate('listing')
)(EditListing);
