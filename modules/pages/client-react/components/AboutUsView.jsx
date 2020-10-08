import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import StaticPageComponent from './StaticPageComponent';

const renderMetaData = () => (
  <Helmet title={`${settings.app.name} - About Us`} meta={[{ name: 'description', content: `${settings.app.name}` }]} />
);

const AboutUsView = () => {
  return (
    <PageLayout type="home">
      {renderMetaData()}
      <StaticPageComponent title={'About Us'}>
        <div style={{ height: '100vh' }}>This is About Us.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

AboutUsView.propTypes = {
  t: PropTypes.func
};

export default AboutUsView;
