import React from 'react';
import { Row, Card, Spin } from 'antd';
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
        <div align="center">
          <br />
          <br />
          <br />
          <Spin />
        </div>
      ) : (
        <Row type="flex" justify="center">
          <Card
            title={
              <h1>
                <strong>{'Add Review'}</strong>
              </h1>
            }
          >
            <ReviewFormComponent t={t} onSubmit={addReview} showModal={true} />
          </Card>
        </Row>
      )}
    </PageLayout>
  );
};

export default AddReviewView;
