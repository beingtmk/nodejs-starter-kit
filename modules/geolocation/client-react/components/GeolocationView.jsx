import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import CurrentLocation from '../containers/CurrentLocation';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const GeolocationView = props => {
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      <CurrentLocation {...props} />
    </PageLayout>
  );
};

GeolocationView.propTypes = {
  t: PropTypes.func
};

export default GeolocationView;
