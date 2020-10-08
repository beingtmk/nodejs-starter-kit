import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';
import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Terms Of Service`}
    meta={[{ name: 'description', content: `${settings.app.name}` }]}
  />
);

const TermsOfServiceView = () => {
  return (
    <PageLayout type="home">
      {renderMetaData()}
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
