import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';
import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const renderMetaData = () => (
  <Helmet title={`${settings.app.name} - Email`} meta={[{ name: 'description', content: `${settings.app.name}` }]} />
);

const EmailView = () => {
  return (
    <PageLayout type="home">
      {renderMetaData()}
      <StaticPageComponent title={'Email'}>
        <div style={{ height: '100vh' }}>This is Email.</div>
      </StaticPageComponent>
    </PageLayout>
  );
};

EmailView.propTypes = {
  t: PropTypes.func
};

export default EmailView;
