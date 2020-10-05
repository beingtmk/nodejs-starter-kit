import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';
import { PageLayout } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const renderMetaData = () => (
  <Helmet title={`${settings.app.name} - FAQ`} meta={[{ name: 'description', content: `${settings.app.name}` }]} />
);

const FaqView = () => {
  return (
    <PageLayout type="home">
      {renderMetaData()}
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
