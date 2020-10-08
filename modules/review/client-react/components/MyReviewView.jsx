import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col, Spin } from 'antd';
import Helmet from 'react-helmet';

import settings from '@gqlapp/config';
import { MODAL } from '@gqlapp/review-common';
import { Form, FormItem, Select, Option, Heading } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';

import ReviewsItemComponent from './ReviewsItemComponent';
import { NoReviews } from './ReviewView';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const MyReviewView = props => {
  const { t, reviews, loading, setModalName, deleteReview } = props;

  const renderFunc = (key, review) => <ReviewsItemComponent key={key} review={review} deleteReview={deleteReview} />;
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
      <Row>
        <Col span={12}>
          <Heading type="1">
            <Icon type="book" /> &nbsp; My Reviews
          </Heading>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Form layout="inline">
              <FormItem label={t('users.list.item.role.label')}>
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
            </Form>
          </Row>
        </Col>
      </Row>
      <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;{reviews && `${reviews.totalCount} reviews`}</h3>
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
  history: PropTypes.object,
  loading: PropTypes.bool
};
export default MyReviewView;
