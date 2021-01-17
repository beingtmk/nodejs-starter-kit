import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';

// import { withDynamicCarousels } from './DynamicCarouselOperations';
import BannerComponentView from '../../components/DCComponents/BannerComponentView';

const BannerComponent = props => {
  const { loading = false, dynamicCarousels = {} } = props;

  // console.log('props', props);
  return !loading && dynamicCarousels ? (
    <BannerComponentView {...props} id="Banner1_0" key="Banner1_0" data={dynamicCarousels} />
  ) : (
    <div style={{ height: '100vh' }}>
      <Spinner />
    </div>
  );
};

BannerComponent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.array
};

export default compose(/* withDynamicCarousels, */ translate('home'))(BannerComponent);
