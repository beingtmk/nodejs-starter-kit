import React from 'react';
import PropTypes from 'prop-types';

import { MODAL } from '@gqlapp/review-common';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import {
  Option,
  Heading,
  MetaTags,
  Icon,
  Row,
  Col,
  Spin,
  RenderSelect,
  SuggestedListComponent
} from '@gqlapp/look-client-react';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import ReviewsItemComponent from './ReviewsItemComponent';
import { NoReviews } from './ReviewView';

const MyReviewView = props => {
  const { t, reviews, loading, setModalName, deleteReview, currentUser, history, ModalName } = props;

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
            <Field
              name="Modal"
              component={RenderSelect}
              placeholder={'Modal'}
              inFilter={true}
              defaultValue={ModalName}
              onChange={e => setModalName(e)}
              label={'Modal'}
              value={ModalName}
              selectStyle={{ width: '100%' }}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Field>
          </Col>
          <Col xs={0} md={24} lg={7}>
            <Field
              name="Modal"
              component={RenderSelect}
              placeholder={'Modal'}
              inFilter={true}
              defaultValue={ModalName}
              onChange={e => setModalName(e)}
              label={'Modal'}
              style={{ display: 'inline-flex' }}
              value={ModalName}
              selectStyle={{ width: '100px' }}
            >
              {MODAL.map((m, i) => (
                <Option key={i} value={m.value}>
                  {m.label}
                </Option>
              ))}
            </Field>
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
  loading: PropTypes.bool,
  ModalName: PropTypes.string
};
export default MyReviewView;
