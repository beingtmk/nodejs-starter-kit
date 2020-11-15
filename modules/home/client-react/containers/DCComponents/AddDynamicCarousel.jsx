import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import AddDynamicCarouselView from '../../components/DCComponents/AddDynamicCarouselView.web';

import { withAddDynamicCarousel } from './DynamicCarouselOperations';

const AddDynamicCarousel = props => {
  // console.log('props', props);
  return <AddDynamicCarouselView {...props} />;
};

export default compose(withAddDynamicCarousel, translate('home'))(AddDynamicCarousel);
