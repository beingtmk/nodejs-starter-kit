import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDiscounts } from './DiscountOperations';
import DiscountsCarouselView from '../components/DiscountsCarouselView';

const DiscountsCarousel = props => {
  const { loading, discounts, title } = props;
  const ids = discounts && discounts.totalCount > 0 && discounts.edges.map(d => d.node.id);

  // console.log('props', props);
  return loading ? null : <DiscountsCarouselView title={title} ids={ids} {...props} />;
};

DiscountsCarousel.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  discounts: PropTypes.object
};

export default compose(withDiscounts, translate('discount'))(DiscountsCarousel);
