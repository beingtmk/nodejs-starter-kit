import React from 'react';
import PropTypes from 'prop-types';

import { MetaTags, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import StaticPageComponent from './StaticPageComponent';

const PrivacyPolicyView = () => {
  return (
    <PageLayout type="home">
      <MetaTags title="Privacy Policy" description={`${settings.app.name}`} />

      <StaticPageComponent title={'Privacy Policy'}>
        <div style={{ height: '100vh' }}>This is Privacy policy.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

PrivacyPolicyView.propTypes = {
  t: PropTypes.func
};

export default PrivacyPolicyView;
