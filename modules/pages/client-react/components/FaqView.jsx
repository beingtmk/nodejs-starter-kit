import React from 'react';
import PropTypes from 'prop-types';

import settings from '@gqlapp/config';
import { MetaTags, PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const FaqView = () => {
  return (
    <PageLayout type="home">
      <MetaTags title="FAQ" description={`${settings.app.name}`} />

      <StaticPageComponent title={'FAQ'}>
        <div style={{ height: '100vh' }}>This is Faq.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

FaqView.propTypes = {
  t: PropTypes.func
};

export default FaqView;
