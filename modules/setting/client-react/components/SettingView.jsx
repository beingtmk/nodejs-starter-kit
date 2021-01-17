import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, MetaTags, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import SettingForm from './SettingForm';

const SettingView = props => {
  const { t, loading, platform, onSubmit } = props;
  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />
      {loading && <Spinner />}
      {!loading && platform && <SettingForm platform={platform} t={t} onSubmit={onSubmit} />}
    </PageLayout>
  );
};

SettingView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  platform: PropTypes.object
};

export default SettingView;
