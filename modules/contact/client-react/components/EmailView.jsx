import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const EmailView = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'Email'}>
        <div style={{ height: '100vh' }}>This is Email.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default EmailView;
