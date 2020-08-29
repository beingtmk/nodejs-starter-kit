import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';

import styled from 'styled-components';
import { Button, Row, Col, Checkbox, Spin } from 'antd';

import ReviewsItemComponent from './ReviewsItemComponent';
// import WriteReviewComponent from './WriteReviewComponent';
// import { PgTitle } from './StyledComponents';

import SuggestedListComponent from './SuggestedListComponent';
// import AvgRatingComponent from './AvgRatingComponent';

const BtnDiv = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 120px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, #ffffff 77.6%);
  z-index: 1;
`;

interface ReviewViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ReviewView: React.SFC<ReviewViewProps> = props => {
  const { reviews, onSubmit, loading, ratings } = props;
  const [photo, setPhoto] = useState(false);
  const renderFunc = (key, review) => (
    <ReviewsItemComponent key={key} review={review} showPhotos={photo} onSubmit={onSubmit} />
  );
  // const renderBtn = setVisible => (
  //   <Button type="primary" block onClick={setVisible}>
  //     <img alt="" src={Pen} style={{ paddingRight: '5px' }} /> Write a review
  //   </Button>
  // );

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
  return (
    <>
      <Row>
        <Col span={24}>
          <h1>{'Rating & Reviews'}</h1>
          <br />
        </Col>
        <Col span={24}>
          {/* {ratings && (
                <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                  <AvgRatingComponent ratings={ratings} />
                </div>
              )} */}
        </Col>
        <Col span={24}>
          <Col span={12}>
            <h3>
              <strong>{`${reviews && reviews.totalCount} reviews`}</strong>
            </h3>
          </Col>
          {/* <Col span={12}>
            <Row type="flex" justify="end" align="bottom">
              <Checkbox onChange={() => setPhoto(!photo)}>
                <strong>With photo</strong>
              </Checkbox>
            </Row>
          </Col> */}
        </Col>
        <Col span={24}>{reviews && reviews.totalCount ? <RenderReviews /> : !loading ? <Spin /> : null}</Col>
      </Row>
      {/* <BtnDiv>
        <Col span={12} style={{ position: 'absolute', bottom: '10px', right: '17px' }}>
          <WriteReviewComponent onSubmit={onSubmit} renderBtn={renderBtn} type="ADD" />
        </Col>
      </BtnDiv> */}
    </>
  );
};

export default ReviewView;
