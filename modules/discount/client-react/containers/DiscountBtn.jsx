import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';

import DiscountBtnView from '../components/DiscountBtnView';
import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount } from './DiscountOperations';

const DiscountBtn = props => {
  const { discountSubscribeToMore, modalId } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  // console.log('props', props);
  return <DiscountBtnView {...props} />;
};

DiscountBtn.propTypes = {
  discountSubscribeToMore: PropTypes.func,
  modalId: PropTypes.number
};

export default compose(withModalDiscount)(DiscountBtn);
