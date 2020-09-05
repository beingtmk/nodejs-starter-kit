import React from 'react';
import { Icon, Row, Col, Spin } from 'antd';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';

import ReviewsItemComponent from './ReviewsItemComponent';
import SuggestedListComponent from './SuggestedListComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const MyReviewView = props => {
  const { t, reviews, loading, history } = props;

  const renderFunc = (key, review) => <ReviewsItemComponent key={key} review={review} history={history} />;
  const RenderReviews = () => (
    <div>
      <SuggestedListComponent
        grid={{
          gutter: 24,
          sm: 1,
          md: 1,
          lg: 1
        }}
        items={reviews}
        {...props}
        renderFunc={renderFunc}
      />
    </div>
  );

  console.log('props', props);
  return (
    <>
      {renderMetaData(t)}
      <h1>
        <Icon type="book" /> &nbsp; My Reviews
      </h1>
      <br />
      <Row>
        <Col span={24}>{reviews && reviews.totalCount ? <RenderReviews /> : !loading ? <Spin /> : null}</Col>
      </Row>
    </>
  );
};

export default MyReviewView;
