import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { NO_IMG } from '@gqlapp/listing-common';
import { DeleteButton, EditButton, CardMeta, Ribbon, Row, Col, Card } from '@gqlapp/look-client-react';
import { ReviewStar } from '@gqlapp/review-client-react';
import { DiscountComponentView, withModalDiscount } from '@gqlapp/discount-client-react';
import { MODAL } from '@gqlapp/review-common';

import { useImageLoaded } from './functions';
import ROUTES from '../routes';
import RelatedCardSkeleton from './RelatedCardSkeleton';

const ListingWraper = styled.div`
  position: relative;
`;

const ListingItemComponent = props => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const { item: listing, deleteProduct, componentStyle, modalDiscount, currentUser } = props;

  const now = new Date().toISOString();
  const listing_id = listing && listing.id;
  const listing_is_new = listing && listing.listingFlags && listing.listingFlags.isNew;
  const listing_media =
    listing &&
    listing.listingMedia &&
    listing.listingMedia.length > 0 &&
    listing.listingMedia.filter(lM => lM.type === 'image');
  const listing_img = listing_media && listing_media.length > 0 ? listing_media[0].url : NO_IMG;
  const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
  const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
  const isDiscountPercent =
    startDate && endDate
      ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
      : modalDiscount && modalDiscount.discountPercent > 0;
  const discountPercent = isDiscountPercent ? modalDiscount && modalDiscount.discountPercent : null;
  const isDiscount = (listing && listing.listingFlags && listing.listingFlags.isDiscount) || isDiscountPercent;
  const discount =
    (listing &&
      listing.listingCostArray &&
      listing.listingCostArray.length > 0 &&
      listing.listingCostArray[0].discount) ||
    discountPercent;
  const cost =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].cost;

  const cardImg = listing_img && (
    <img
      ref={ref}
      onLoad={onLoad}
      src={listing_img}
      style={{
        width: '100%'
      }}
    />
  );
  const listingCard = (
    <Link className="listing-link" to={`${ROUTES.listingDetailLink}${listing_id}`}>
      <Card
        bodyStyle={{ margin: '0px', padding: '14px', textAlign: 'left' }}
        hoverable
        cover={
          <div
            style={{
              // overflow: 'hidden',
              // height: '230px',
              height: 'fit-content',
              borderRadius: '8px 8px 0px 0px'
            }}
            align="center"
          >
            {cardImg}
          </div>
        }
      >
        <CardMeta
          title={
            <span
              style={{
                fontSize: '18px',
                overflow: 'hidden',
                lineClamp: 1,
                display: 'box'
              }}
            >
              {listing && listing.title}
            </span>
          }
          description={
            <>
              <DiscountComponentView
                isDiscount={isDiscount}
                cost={cost}
                discount={discount}
                span={[16, 8]}
                card={true}
                rowStyle={{ height: '75px' }}
              />
              <ReviewStar
                filter={{
                  isActive: true,
                  modalId: listing && listing.id,
                  modalName: MODAL[1].value
                }}
                currentUser={currentUser}
              />
            </>
          }
        />
        {startDate <= now && endDate >= now ? (
          <h4>
            Deal ends in:{' '}
            {Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
              ? ` ${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
              : Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60)) !== 0
              ? ` ${Math.round((new Date(endDate) - new Date()) / (1000 * 60 * 60))} hours`
              : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
              ? ` ${Math.round((new Date(endDate) - new Date()) / (1000 * 60))} minutes`
              : Math.round((new Date(endDate) - new Date()) / (1000 * 60)) !== 0
              ? ` ${Math.round((new Date(endDate) - new Date()) / 1000)} seconds`
              : 'Deal has Ended!'}
          </h4>
        ) : startDate >= now && endDate >= now ? (
          <h4>
            Deal starts in:
            {Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)) !== 0
              ? ` ${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24))} days`
              : Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60)) !== 0
              ? ` ${Math.round((new Date(startDate) - new Date()) / (1000 * 60 * 60))} hours`
              : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
              ? ` ${Math.round((new Date(startDate) - new Date()) / (1000 * 60))} minutes`
              : Math.round((new Date(startDate) - new Date()) / (1000 * 60)) !== 0
              ? ` ${Math.round((new Date(startDate) - new Date()) / 1000)} seconds`
              : 'Deal has Ended!'}
          </h4>
        ) : (
          <br />
        )}
        <br />
        <br />
        <br />
        <br />
      </Card>
    </Link>
  );
  return (
    <>
      {!loaded && <RelatedCardSkeleton />}
      <ListingWraper style={{ ...componentStyle, display: !loaded && 'none' }}>
        {/* <IfLoggedIn>
          <BookmarkComponent
            handleBookmark={() => bookmarkListing(listing.id, currentUser.id)}
            listing={listing}
            currentUser={currentUser}
          />
        </IfLoggedIn> */}
        {/* {listing_is_new && <NewLabel>{'New'}</NewLabel>} */}
        <div
          align="center"
          style={{
            padding: '20px',
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }}
        >
          <Row type="flex" gutter={[24, 4]}>
            <Col span={24}>
              <Link to={`${ROUTES.editLink}${listing_id}`}>
                <EditButton color="primary" size="lg" />
              </Link>
            </Col>
            <Col span={24}>
              <DeleteButton onClick={() => deleteProduct(listing_id)} size="lg" />
            </Col>
          </Row>
        </div>
        {listing_is_new ? (
          <Ribbon placement={'start'} text={'New'}>
            {listingCard}
          </Ribbon>
        ) : (
          listingCard
        )}
      </ListingWraper>
    </>
  );
};

ListingItemComponent.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.object,
  deleteProduct: PropTypes.func,
  history: PropTypes.object,
  loading: PropTypes.bool,
  componentStyle: PropTypes.object,
  modalDiscount: PropTypes.object,
  t: PropTypes.func
};

export default compose(withModalDiscount)(ListingItemComponent);
