import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { subscribeToDiscount } from './DiscountSubscriptions';
import { withModalDiscount } from './DiscountOperations';
import DiscountComponentView from '../components/DiscountComponentView';

const DiscountComponent = props => {
  const { modalDiscount, subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscount(subscribeToMore, modalDiscount && modalDiscount.id);
    return () => subscribe();
  }, [subscribeToMore, modalDiscount]);

  // console.log('props', props);
  return (
    <DiscountComponentView
      isDiscount={modalDiscount && modalDiscount.discountPercent > 0}
      discount={modalDiscount && modalDiscount.discountPercent}
      {...props}
    />
  );
};

DiscountComponent.propTypes = {
  modalDiscount: PropTypes.object,
  subscribeToMore: PropTypes.func
};

export default compose(withModalDiscount, translate('discount'))(DiscountComponent);
