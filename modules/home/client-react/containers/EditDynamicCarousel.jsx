import React from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDynamicCarousel, withEditDynamicCarousel } from './DynamicCarouselOperations';
import EditDynamicCarouselView from '../components/EditDynamicCarouselView.web';
// import { useDynamicCarouselWithSubscription } from './withSubscriptions';

const EditDynamicCarousel = props => {
  // const { updateQuery, subscribeToMore, dynamicCarousel, history } = props;
  // const dynamicCarouselsUpdated = useDynamicCarouselWithSubscription(subscribeToMore, dynamicCarousel && dynamicCarousel.id);

  // useEffect(() => {
  //   if (dynamicCarouselsUpdated) {
  //     updateDynamicCarouselState(dynamicCarouselsUpdated, updateQuery, history);
  //   }
  // });
  console.log('props', props);
  return <EditDynamicCarouselView {...props} />;
};

EditDynamicCarousel.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  dynamicCarousel: PropTypes.object,
  history: PropTypes.object
};

export default compose(withDynamicCarousel, withEditDynamicCarousel, translate('home'))(EditDynamicCarousel);
