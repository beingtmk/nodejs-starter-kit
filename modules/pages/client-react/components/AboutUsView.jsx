import React from 'react';
import PropTypes from 'prop-types';

import { MetaTags, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import StaticPageComponent from './StaticPageComponent';

const AboutUsView = () => {
  return (
    <PageLayout type="home">
      <MetaTags title="About Us" description={settings.app.name} />

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
