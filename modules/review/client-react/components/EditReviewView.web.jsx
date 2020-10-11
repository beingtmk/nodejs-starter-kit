import React from 'react';
import PropTypes from 'prop-types';
import { Row, Card, Spin } from 'antd';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';

import ReviewFormComponent from './ReviewFormComponent';

const EditReviewView = props => {
  const { review, onSubmit, currentUser, t } = props;
  return (
    <PageLayout type="forms">
      <MetaTags title={t('title')} description={t('meta')} />

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
