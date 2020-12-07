import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withDynamicCarousel, withEditDynamicCarousel, subscribeToDynamicCarousel } from './DynamicCarouselOperations';
import EditDynamicCarouselView from '../../components/DCComponents/EditDynamicCarouselView.web';

const EditDynamicCarousel = props => {
  const { subscribeToMore, history, editDynamicCarousel } = props;
  useEffect(() => {
    const subscribe = subscribeToDynamicCarousel(subscribeToMore, history);
    return () => subscribe();
  });
  const handleSubmit = values => {
    try {
      editDynamicCarousel(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <EditDynamicCarouselView onSubmit={handleSubmit} {...props} />;
};

EditDynamicCarousel.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  dynamicCarousel: PropTypes.object,
  history: PropTypes.object,
  editDynamicCarousel: PropTypes.func
};

export default compose(withDynamicCarousel, withEditDynamicCarousel, translate('home'))(EditDynamicCarousel);
