import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';

import { withDynamicCarousels } from './DynamicCarouselOperations';
import ImageBannerComponentView from '../../components/DCComponents/ImageBannerComponentView';

const ImageBannerComponent = props => {
  const { loading, dynamicCarousels } = props;

  // console.log('props', props);
  return !loading && dynamicCarousels ? (
    <ImageBannerComponentView {...props} id="Banner1_0" key="Banner1_0" data={dynamicCarousels} />
  ) : (
    <div align="center">
      <Spin />
    </div>
  );
};

ImageBannerComponent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.array
};

export default compose(withDynamicCarousels, translate('home'))(ImageBannerComponent);
