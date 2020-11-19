import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';

import { withDynamicCarousels } from './DynamicCarouselOperations';
import ImageBannerComponentView from '../../components/DCComponents/ImageBannerComponentView';

const ImageBannerComponent = props => {
  const { loading, dynamicCarousels } = props;

  // console.log('props', props);
  return !loading && dynamicCarousels ? (
    <ImageBannerComponentView {...props} id="Banner1_0" key="Banner1_0" data={dynamicCarousels} />
  ) : (
    <Spinner size="small" />
  );
};

ImageBannerComponent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.array
};

export default compose(withDynamicCarousels, translate('home'))(ImageBannerComponent);
