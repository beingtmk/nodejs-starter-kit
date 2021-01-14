import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Heading, Icon, PageLayout, Spinner, MetaTags } from '@gqlapp/look-client-react';
import { Review } from '@gqlapp/review-client-react';
import { MODAL } from '@gqlapp/review-common';

import RelatedCardComponent from './RelatedCardComponent';

const ListingReviewView = props => {
  const { loading, cartLoading, t, onDelete, history, getCart, listing, canUserReview, currentUser } = props;
  const cartItemArray =
    getCart && getCart.orderDetails && getCart.orderDetails.length > 0
      ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
      : [];

  return (
    <PageLayout>
      <MetaTags title={t('listingReview.title')} description={t('listingReview.meta')} />
      <Heading type="2">
        <Icon type="BookOutlined" /> &nbsp; All Review
      </Heading>
      {loading && <Spinner />}
      {!loading && (
        <Row gutter={24}>
          <Col lg={8}>
            <RelatedCardComponent
              listing={listing}
              history={history}
              modalName={'listing'}
              modalId={listing.id}
              currentUser={currentUser}
              inCart={cartItemArray.length === 0}
              loading={cartLoading}
              onDelete={() => onDelete(cartItemArray[0].id)}
            />
          </Col>
          <Col lg={16}>
            {listing && (
              <Review
                filter={{
                  isActive: true,
                  modalId: listing && listing.id,
                  modalName: MODAL[1].value
                }}
                showAdd={canUserReview}
                currentUser={currentUser}
                t={t}
              />
            )}
          </Col>
        </Row>
      )}
    </PageLayout>
  );
};

ListingReviewView.propTypes = {
  loading: PropTypes.bool,
  cartLoading: PropTypes.bool,
  t: PropTypes.func,
  onDelete: PropTypes.func,
  listing: PropTypes.object,
  canUserReview: PropTypes.bool,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  getCart: PropTypes.object
};

export default ListingReviewView;
