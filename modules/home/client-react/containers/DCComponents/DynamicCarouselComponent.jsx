import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';

import { withDynamicCarousels } from './DynamicCarouselOperations';
import DynamicCarouselComponentView from '../../components/DCComponents/DynamicCarouselComponentView';

const DynamicCarouselComponent = props => {
  const { loading, dynamicCarousels } = props;

  // console.log('props', props);
  return !loading && dynamicCarousels ? (
    <DynamicCarouselComponentView {...props} id="Banner1_0" key="Banner1_0" data={dynamicCarousels} />
  ) : (
    <div style={{ height: '100vh' }}>
      <Spinner />
    </div>
  );
};

DynamicCarouselComponent.propTypes = {
  loading: PropTypes.bool,
  dynamicCarousels: PropTypes.array
};

export default compose(withDynamicCarousels, translate('home'))(DynamicCarouselComponent);
