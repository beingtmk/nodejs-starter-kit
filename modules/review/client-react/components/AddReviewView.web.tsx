import React from 'react';
import { Row, Spin } from 'antd';
import Helmet from 'react-helmet';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { PageLayout } from '@gqlapp/look-client-react';

import ReviewFormComponent from './ReviewFormComponent';

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

export interface AddReviewViewProps {
  t: TranslateFunction;
  loading: boolean;
  addReview: () => null;
}

const AddReviewView: React.FC<AddReviewViewProps> = props => {
  const { t, loading, addReview } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <br />
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <Spin />
      ) : (
        <Row type="flex" justify="center">
          <ReviewFormComponent cardTitle={'Add Review'} t={t} onSubmit={addReview} showModal={true} />
        </Row>
      )}
    </PageLayout>
  );
};

export default AddReviewView;
