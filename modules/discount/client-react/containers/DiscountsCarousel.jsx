import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDiscounts } from './DiscountOperations';
import DiscountsCarouselView from '../components/DiscountsCarouselView';
import { subscribeToDiscounts } from './DiscountSubscriptions';

const DiscountsCarousel = props => {
  const { subscribeToMore, loading, discounts, title, filter } = props;
  useEffect(() => {
    const subscribe = subscribeToDiscounts(subscribeToMore, filter);
    return () => subscribe();
  });
  const ids = (discounts && discounts.totalCount > 0 && discounts.edges.map(d => d.node.modalId)) || [];

  // console.log('props', props);
  return loading ? null : <DiscountsCarouselView title={title} ids={ids} {...props} />;
};

DiscountsCarousel.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  discounts: PropTypes.object,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(withDiscounts, translate('discount'))(DiscountsCarousel);
