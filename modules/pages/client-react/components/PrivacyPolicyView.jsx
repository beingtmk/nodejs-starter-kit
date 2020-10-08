import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import StaticPageComponent from './StaticPageComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Privacy Policy`}
    meta={[{ name: 'description', content: `${settings.app.name}` }]}
  />
);

const PrivacyPolicyView = () => {
  return (
    <PageLayout type="home">
      {renderMetaData()}
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
