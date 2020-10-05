import React from 'react';

import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const FaqView = () => {
  return (
    <PageLayout type="home">
      <StaticPageComponent title={'FAQ'}>
        <div style={{ height: '100vh' }}>This is Faq.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

export default FaqView;
