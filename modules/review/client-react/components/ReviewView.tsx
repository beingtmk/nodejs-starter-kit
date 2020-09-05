import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

// import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
// import styled from 'styled-components';
import { Icon, Button, Row, Col, Checkbox, Spin } from 'antd';

// import WriteReviewComponent from './WriteReviewComponent';
// import { PgTitle } from './StyledComponents';

import ReviewsItemComponent from './ReviewsItemComponent';
import SuggestedListComponent from './SuggestedListComponent';
import AvgRatingComponent from './AvgRatingComponent';
import ROUTES from '../routes';

// const BtnDiv = styled.div`
//   position: fixed;
//   bottom: 0;
//   right: 0;

//   width: 100%;
//   height: 120px;

//   background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, #ffffff 77.6%);
//   z-index: 1;
// `;

interface ReviewViewProps {
  t: TranslateFunction;
  handleHelpful: (id: number, value: number) => null;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ReviewView: React.SFC<ReviewViewProps> = props => {
  const { reviews, loading, ratingAverage, handleHelpful } = props;
  const [photo, setPhoto] = useState(false);
  const renderFunc = (key, review) => (
    <ReviewsItemComponent
      key={key}
      review={review}
      showPhotos={photo}
      handleHelpful={handleHelpful}
      history={history}
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
            <Link to={ROUTES.add}>
              <Button type={'primary'}>
                <Icon type="plus-circle" /> {'Add review'}
              </Button>
            </Link>
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
      {/* <BtnDiv>
        <Col span={12} style={{ position: 'absolute', bottom: '10px', right: '17px' }}>
          <WriteReviewComponent onSubmit={onSubmit} renderBtn={renderBtn} type="ADD" />
        </Col>
      </BtnDiv> */}
    </>
  );
};

export default ReviewView;
