import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const AboutUs = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'About Us'}>
        <div style={{ height: '100vh' }}>This is AboutUs.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default AboutUs;
