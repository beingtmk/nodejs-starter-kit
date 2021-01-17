import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import DynamicCarouselView from '../../components/DCComponents/DynamicCarouselView';

import {
  withDynamicCarouselState,
  withDynamicCarousels,
  withDeleteDynamicCarousel,
  withDynamicCarouselOrderByUpdating,
  withDynamicCarouselFilterUpdating,
  subscribeToDynamicCarousels
} from './DynamicCarouselOperations';

const DynamicCarousel = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToDynamicCarousels(subscribeToMore);
    return () => subscribe();
  });

  // console.log('props', props);
  return <DynamicCarouselView {...props} />;
};

DynamicCarousel.propTypes = {
  subscribeToMore: PropTypes.func
};

export default compose(
  withDynamicCarouselState,
  withDynamicCarousels,
  withDeleteDynamicCarousel,
  withDynamicCarouselOrderByUpdating,
  withDynamicCarouselFilterUpdating,
  translate('home')
)(DynamicCarousel);
