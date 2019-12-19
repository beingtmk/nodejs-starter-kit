import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import { PageLayout, Loading, Card } from '@gqlapp/look-client-react';
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
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <PageLayout>
      {renderMetaData(t)}
      {flag ? (
        <Card title="Add Blog">
          <BlogFormCmponent />
        </Card>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
};

export default NewBlogView;
