import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import BlogFormCmponent from './BlogFormCmponent';
import settings from '@gqlapp/config';

interface NewBlogViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const NewBlogView = ({ t }: NewBlogViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <BlogFormCmponent />
    </PageLayout>
  );
};

export default NewBlogView;
