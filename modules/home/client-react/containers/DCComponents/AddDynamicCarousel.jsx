import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import AddDynamicCarouselView from '../../components/DCComponents/AddDynamicCarouselView.web';

import { withAddDynamicCarousel } from './DynamicCarouselOperations';

const AddDynamicCarousel = props => {
  const { addDynamicCarousel } = props;
  const handleSubmit = values => {
    try {
      delete values.id;
      addDynamicCarousel(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <AddDynamicCarouselView onSubmit={handleSubmit} {...props} />;
};

AddDynamicCarousel.propTypes = {
  addDynamicCarousel: PropTypes.func
};

export default compose(withAddDynamicCarousel, translate('home'))(AddDynamicCarousel);
