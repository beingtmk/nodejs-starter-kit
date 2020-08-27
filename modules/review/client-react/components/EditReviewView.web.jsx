import React from 'react';
import Helmet from 'react-helmet';
import { Row, Spin } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ReviewFormComponent from './ReviewFormComponent';

const EditReviewView = props => {
  const { review, editReview, currentUser, t } = props;
  const renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData(t)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row type="flex" justify="center">
        {review ? (
          <ReviewFormComponent
            cardTitle="Edit Review"
            t={t}
            review={review}
            onSubmit={editReview}
            currentUser={currentUser}
          />
        ) : (
          <Spin />
        )}
      </Row>
    </PageLayout>
  );
};

export default EditReviewView;
