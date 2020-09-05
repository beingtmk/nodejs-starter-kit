import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { Row, Col, Checkbox, Spin } from 'antd';

import { Reviews } from '../containers/Reviews.web';
import ReviewModal from './ReviewModal';
import ReviewsItemComponent from './ReviewsItemComponent';
import SuggestedListComponent from './SuggestedListComponent';
import AvgRatingComponent from './AvgRatingComponent';

interface ReviewViewProps {
  t: TranslateFunction;
  reviews: Reviews;
  loading: boolean;
  modalName: string;
  modalId: number;
  ratingAverage: {
    id: number;
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
  };
  addReview: () => null;
  deleteReview: (id: number) => null;
  handleHelpful: (id: number, value: number) => null;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ReviewView: React.SFC<ReviewViewProps> = props => {
  const { reviews, loading, ratingAverage, handleHelpful, addReview, deleteReview, t, modalName, modalId } = props;
  const [photo, setPhoto] = useState(false);
  const renderFunc = (key, review) => (
    <ReviewsItemComponent
      key={key}
      review={review}
      showPhotos={photo}
      handleHelpful={handleHelpful}
      deleteReview={deleteReview}
    />
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
      {renderMetaData(t)}
      <Row>
        <Col span={8}>
          <div align="center">
            <h1>{'Rating'}</h1>
            <h1>{' & '}</h1>
            <h1>{'Reviews'}</h1>
          </div>
        </Col>
        <Col span={4}>
          <br />
          <div align="center">
            <ReviewModal cardTitle={'Add Review'} t={t} addReview={addReview} modalName={modalName} modalId={modalId} />
            <br />
            <br />
            <Checkbox onChange={() => setPhoto(!photo)}>
              <strong>With photo</strong>
            </Checkbox>
          </div>
        </Col>
        <Col span={12}>
          {ratingAverage && (
            <>
              <AvgRatingComponent rating={ratingAverage} />
            </>
          )}
        </Col>
        <Col span={24}>
          <br />
          <Col span={12}>
            <h3>
              <strong>{`${reviews && reviews.totalCount} reviews`}</strong>
            </h3>
          </Col>
        </Col>
        <Col span={24}>{reviews && reviews.totalCount ? <RenderReviews /> : !loading ? <Spin /> : null}</Col>
      </Row>
    </>
  );
};

export default ReviewView;
