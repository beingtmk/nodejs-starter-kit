import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withDiscountsState,
  withDiscounts,
  withFilterUpdating,
  withOrderByUpdating,
  withDiscountDeleting
  // withEditDiscount,
} from './DiscountOperations';
import DiscountsView from '../components/DiscountsView.web';
import { subscribeToDiscounts } from './DiscountSubscriptions';

const Discounts = props => {
  const { subscribeToMore /* editDiscount */ } = props;
  useEffect(() => {
    const subscribe = subscribeToDiscounts(subscribeToMore, props.filter);
    return () => subscribe();
  });
  // const handleToggle = (field, value, id) => {
  //   const input = {};
  //   input.id = id;
  //   _.set(input, field, value);
  //   try {
  //     editDiscount(input);
  //   } catch (e) {
  //     throw Error(e);
  //   }
  // };

  // console.log('props', props);
  return <DiscountsView /* onToggle={handleToggle} */ filter={{}} {...props} />;
};
Discounts.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  editDiscount: PropTypes.func
};

export default compose(
  withDiscountsState,
  withDiscounts,
  withFilterUpdating,
  withOrderByUpdating,
  withDiscountDeleting,
  // withEditDiscount,
  translate('discount')
)(Discounts);
