import PropTypes from 'prop-types';
import React from 'react';

import settings from '@gqlapp/config';
import { PageLayout, MetaTags } from '@gqlapp/look-client-react';

import StaticPageComponent from './StaticPageComponent';

const EmailView = () => {
  return (
    <PageLayout type="home">
      <MetaTags title="Email" description={settings.app.name} />

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
