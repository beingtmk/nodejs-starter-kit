import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const AboutUsView = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'About Us'}>
        <div style={{ height: '100vh' }}>This is About Us.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default AboutUsView;