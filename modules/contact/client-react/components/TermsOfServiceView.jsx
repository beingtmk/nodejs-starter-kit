import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const TermsOfServiceView = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'Terms Of Service'}>
        <div style={{ height: '100vh' }}>This is Terms of service.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default TermsOfServiceView;
