import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewListComponent from './ReviewListComponent.web';
import ROUTES from '../routes';

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

export interface ReviewViewProps {
  t: TranslateFunction;
}

const ReviewView: React.SFC<ReviewViewProps> = props => {
  const { t } = props;

  return (
    <PageLayout>
      {renderMetaData(t)}
      <h2>{t('review.subTitle')}</h2>
      <Link to={ROUTES.add}>
        <Button color="primary">{t('review.btn.add')}</Button>
      </Link>
      {/* <hr />
      <ReviewFilterComponent {...props} /> */}
      <hr />
      <ReviewListComponent {...props} />
    </PageLayout>
  );
};

export default ReviewView;
