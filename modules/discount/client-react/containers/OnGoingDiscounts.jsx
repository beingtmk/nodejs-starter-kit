import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDiscounts } from './DiscountOperations';
import OnGoingDiscountsView from '../components/OnGoingDiscountsView';

const OnGoingDiscounts = props => {
  const { loading, discounts } = props;
  const ids = discounts && discounts.totalCount > 0 && discounts.edges.map(d => d.node.id);

  // console.log('props', props);
  return loading ? <Spin /> : <OnGoingDiscountsView ids={ids} {...props} />;
};

OnGoingDiscounts.propTypes = {
  loading: PropTypes.bool,
  discounts: PropTypes.object
};

export default compose(withDiscounts, translate('discount'))(OnGoingDiscounts);
