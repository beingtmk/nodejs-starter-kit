import React from 'react';

import { PageLayout,MetaTags } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

interface $Module$ViewProps {
  t: TranslateFunction;
}


const $Module$View = ({ t }: $Module$ViewProps) => {
  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div>
    </PageLayout>
  );
};

export default $Module$View;
