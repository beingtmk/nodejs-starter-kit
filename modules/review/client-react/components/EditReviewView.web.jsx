import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Row, Card, Spin } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ReviewFormComponent from './ReviewFormComponent';

const EditReviewView = props => {
  const { review, onSubmit, currentUser, t } = props;
  const renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );
  return (
    <PageLayout type="forms">
      {renderMetaData(t)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row type="flex" justify="center">
        {review ? (
          <Card
            title={
              <h1>
                <strong>{'Edit Review'}</strong>
              </h1>
            }
          >
            <ReviewFormComponent
              t={t}
              review={review}
              onSubmit={onSubmit}
              currentUser={currentUser}
              showModal={false}
            />
          </Card>
        ) : (
          <div align="center">
            <br />
            <br />
            <br />
            <Spin />
          </div>
        )}
      </Row>
    </PageLayout>
  );
};
EditReviewView.propTypes = {
  review: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default EditReviewView;
