import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const PrivacyPolicyView = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'Privacy Policy'}>
        <div style={{ height: '100vh' }}>This is Privacy policy.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default PrivacyPolicyView;
