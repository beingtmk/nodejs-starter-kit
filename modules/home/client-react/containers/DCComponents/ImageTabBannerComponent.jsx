import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';

import { withDynamicCarousels } from './DynamicCarouselOperations';
import ImageTabBannerComponentView from '../../components/DCComponents/ImageTabBannerComponentView';

const ImageTabBannerComponent = props => {
  const { loading, dynamicCarousels } = props;

  // console.log('props', props);
  return !loading && dynamicCarousels ? (
    <ImageTabBannerComponentView {...props} id="Banner1_0" key="Banner1_0" data={dynamicCarousels} />
  ) : null;
};

ImageTabBannerComponent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.array
};

export default compose(withDynamicCarousels, translate('home'))(ImageTabBannerComponent);
