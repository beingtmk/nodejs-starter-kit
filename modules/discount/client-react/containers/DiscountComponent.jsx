import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount } from './DiscountOperations';
import DiscountComponentView from '../components/DiscountComponentView';

const DiscountComponent = props => {
  const { modalDiscount, subscribeToMore } = props;
  const now = new Date().toISOString();
  const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
  const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
  const isDiscountPercent = startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0;
  const discountPercent = isDiscountPercent
    ? modalDiscount && modalDiscount.discountPercent > 0 && modalDiscount.discountPercent
    : null;

  useEffect(() => {
    const subscribe = subscribeToDiscount(subscribeToMore, modalDiscount && modalDiscount.id);
    return () => subscribe();
  }, [subscribeToMore, modalDiscount]);

  // console.log('props', props);
  return <DiscountComponentView isDiscount={isDiscountPercent} discount={discountPercent} {...props} />;
};

DiscountComponent.propTypes = {
  modalDiscount: PropTypes.object,
  subscribeToMore: PropTypes.func
};

export default compose(withModalDiscount, translate('discount'))(DiscountComponent);
