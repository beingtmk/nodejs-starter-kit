import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

interface DemoViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const DemoView = ({ t }: DemoViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div>
    </PageLayout>
  );
};

export default DemoView;
