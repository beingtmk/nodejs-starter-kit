import React, { useState } from 'react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import {
  Heading,
  Row,
  Col,
  EmptyComponent,
  Spin,
  SuggestedListComponent,
  ModalDrawer,
  CheckBox
} from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { LISTING_ROUTES } from '@gqlapp/listing-client-react';

import { Reviews, Review } from '../containers/Reviews.web';
import ReviewsItemComponent from './ReviewsItemComponent';
import AvgRatingComponent from './AvgRatingComponent';
import ReviewFormComponent from './ReviewFormComponent';

interface ReviewViewProps {
  t: TranslateFunction;
  filter: {
    modalName: string;
    modalId: number;
  };
  reviews: Reviews;
  loading: boolean;
  showAdd: boolean;
  reviewHelpfulStatus: boolean;
  currentUser: object;
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
  handleHelpful: (id: number, value: number) => Promise<void>;
}

const ReviewView: React.FC<ReviewViewProps> = props => {
  const {
    reviews,
    filter,
    loading,
    ratingAverage,
    handleHelpful,
    addReview,
    deleteReview,
    t,
    showAdd,
    currentUser,
    listing
  } = props;
  const [photo, setPhoto] = useState(false);
  const renderFunc = (key: number, review: Review) => (
    <ReviewsItemComponent
      t={t}
      key={key}
      review={review}
      showPhotos={photo}
      handleHelpful={handleHelpful}
      deleteReview={deleteReview}
      currentUser={currentUser}
    />
  );

  const RenderReviews = () => (
    <div>
      <SuggestedListComponent
        endText={'reviews'}
        grid={{
          gutter: 24,
          xs: 1,
          md: 1,
          lg: 1,
          xxl: 1
        }}
        items={reviews}
        {...props}
        renderFunc={renderFunc}
      />
    </div>
  );
  const { modalName, modalId } = filter;
  return (
    <>
      {/* <MetaTags title={t('title')} description={t('meta')} /> */}
      <Row type="flex" align="middle">
        <Col lg={14} md={15} sm={15} xs={14}>
          <Heading type="1"> {t('review.heading')}</Heading>
        </Col>
        <Col lg={showAdd ? 5 : 10} md={4} sm={4} xs={10} align="right">
          <CheckBox onChange={() => setPhoto(!photo)}>
            <strong>{t('review.withPhoto')}</strong>
          </CheckBox>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24}>
          <br />
        </Col>
        {showAdd && (
          <Col lg={5} md={5} sm={5} xs={24}>
            <>
              <ModalDrawer buttonText={t('addReview')} modalTitle={t('addReview')} height="80%">
                <ReviewFormComponent listing={listing} t={t} onSubmit={addReview} modalData={{ modalName, modalId }} />
              </ModalDrawer>
            </>
          </Col>
        )}
      </Row>
      <Row>
        <br />
        <Col span={24}>
          {ratingAverage && (
            <>
              <AvgRatingComponent rating={ratingAverage} t={t} />
            </>
          )}
        </Col>
        <Col span={24}>
          <br />
          <Col span={12}>
            <h3>
              <strong>{`${(reviews && reviews.totalCount) || 0} reviews`}</strong>
            </h3>
          </Col>
        </Col>
        <Col span={24}>
          {loading && (
            <div align="center">
              <br />
              <br />
              <br />
              <Spin text="Loading" />
            </div>
          )}
        </Col>
        <Col span={24}>
          {reviews && reviews.totalCount ? (
            <RenderReviews />
          ) : (
            !loading && (
              <EmptyComponent
                description={t('adminPanel.noReviewsMsg')}
                emptyLink={`${LISTING_ROUTES.listingCatalogue}`}
              />
            )
          )}
        </Col>
      </Row>
    </>
  );
};

export default ReviewView;
