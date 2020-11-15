import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDynamicCarousel, withEditDynamicCarousel, subscribeToDynamicCarousel } from './DynamicCarouselOperations';
import EditDynamicCarouselView from '../../components/DCComponents/EditDynamicCarouselView.web';

const EditDynamicCarousel = props => {
  const { subscribeToMore, history } = props;
  useEffect(() => {
    const subscribe = subscribeToDynamicCarousel(subscribeToMore, history);
    return () => subscribe();
  });

  // console.log('props', props);
  return <EditDynamicCarouselView {...props} />;
};

EditDynamicCarousel.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  dynamicCarousel: PropTypes.object,
  history: PropTypes.object
};

export default compose(withDynamicCarousel, withEditDynamicCarousel, translate('home'))(EditDynamicCarousel);
