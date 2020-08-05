import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import DynamicCarouselListView from '../components/DynamicCarouselListView';

import {
  withDynamicCarousels,
  withDeleteDynamicCarousel,
  subscribeToDynamicCarousels
} from './DynamicCarouselOperations';

const DynamicCarousel = props => {
  const {
    // refetch,
    subscribeToMore
  } = props;

  useEffect(() => {
    const subscribe = subscribeToDynamicCarousels(subscribeToMore);
    // refetch();
    return () => subscribe();
  });

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${'DynamicCarousel-Admin'}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${'View and edit DynamicCarousel'}`
        }
      ]}
    />
  );
  console.log('props', props);
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>Dynamic Carousel</h2>
      <Link to="/new/dynamic-carousel">
        <Button color="primary">
          {/* {props.t('home.btn.add')} */}
          Add
        </Button>
      </Link>
      <hr />
      <DynamicCarouselListView {...props} />
    </PageLayout>
  );
};

DynamicCarousel.propTypes = {
  refetch: PropTypes.func,
  subscribeToMore: PropTypes.func
};

export default compose(withDynamicCarousels, withDeleteDynamicCarousel, translate('home'))(DynamicCarousel);
