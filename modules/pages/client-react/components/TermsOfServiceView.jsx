import React from 'react';
import PropTypes from 'prop-types';

import settings from '@gqlapp/config';
import { MetaTags, PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const TermsOfServiceView = () => {
  return (
    <PageLayout type="home">
      <MetaTags title="Terms of Service" description={`${settings.app.name}`} />

      <StaticPageComponent title={'Terms Of Service'}>
        <div style={{ height: '100vh' }}>This is Terms of service.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};
TermsOfServiceView.propTypes = {
  t: PropTypes.func
};

export default TermsOfServiceView;
