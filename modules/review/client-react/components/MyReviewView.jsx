import React from 'react';
import PropTypes from 'prop-types';

import { MODAL } from '@gqlapp/review-common';
import {
  FormItem,
  Select,
  Option,
  Heading,
  MetaTags,
  Icon,
  Row,
  Col,
  Spin,
  SuggestedListComponent
} from '@gqlapp/look-client-react';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import ReviewsItemComponent from './ReviewsItemComponent';
import { NoReviews } from './ReviewView';

const MyReviewView = props => {
  const { t, reviews, loading, setModalName, deleteReview, currentUser, history } = props;

  const renderFunc = (key, review) => (
    <ReviewsItemComponent
      t={t}
      key={key}
      review={review}
      deleteReview={deleteReview}
      currentUser={currentUser}
      history={history}
      showModal={true}
    />
  );
  const RenderReviews = () => (
    <div>
      <SuggestedListComponent
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

  // console.log('props', props);
  return (
    <>
      <MetaTags title={t('title')} description={t('meta')} />
      <Row type={'flex'}>
        <Col xs={24} md={12} lg={12}>
          <Heading type="1">
            <Icon type="BookOutlined" />
            {t('myReview')}
          </Heading>
          <h3>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;{reviews && `${displayDataCheck(reviews.totalCount)} reviews`}
          </h3>
        </Col>
        <Col xs={24} md={12} lg={12} align="right">
          <Col lg={0} md={0}>
            <FormItem
              label={'Modal'}
              //  style={{ display: 'inline-flex' }}
            >
              <Select
                name="modal"
                defaultValue={MODAL[0].value}
                style={{ width: '100%' }}
                onChange={e => setModalName(e)}
              >
                {MODAL.map((m, i) => (
                  <Option key={i} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col xs={0} md={24} lg={24}>
            <FormItem label={'Modal'} style={{ display: 'inline-flex' }}>
              <Select
                name="modal"
                defaultValue={MODAL[0].value}
                style={{ width: '100px' }}
                onChange={e => setModalName(e)}
              >
                {MODAL.map((m, i) => (
                  <Option key={i} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Col>
      </Row>
      <br />

      <Row>
        <Col span={24}>
          {loading && (
            <div align="center">
              <br />
              <br />
              <br />
              <Spin text={t('review.loadMsg')} />
            </div>
          )}
        </Col>
        <Col span={24}>{reviews && reviews.totalCount ? <RenderReviews /> : <NoReviews />}</Col>
      </Row>
    </>
  );
};
MyReviewView.propTypes = {
  t: PropTypes.func,
  setModalName: PropTypes.func,
  deleteReview: PropTypes.func,
  reviews: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool
};
export default MyReviewView;
