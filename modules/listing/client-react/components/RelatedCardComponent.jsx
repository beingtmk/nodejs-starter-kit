import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Statistic, Card, Icon, message, Button } from 'antd';
import { AddButton } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth';

import { withAddToCart } from '@gqlapp/order-client-react/containers/OrderOperations';
// eslint-disable-next-line import/no-named-default
import { default as ORDER_ROUTES } from '@gqlapp/order-client-react/routes';

import { withToogleListingBookmark } from '../containers/ListingOperations';
import ROUTES from '../routes';

import BookmarkComponent from './BookmarkComponent';
import CurrencyDisplay from './CurrencyDisplay';

const { Meta } = Card;

const NewLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px;
  color: white;
  background: #0985be;
  z-index: 2;
`;

const ListingWraper = styled.div`
  position: relative;
`;

const RelatedCardComponent = props => {
  const { currentUser, history, addToCart } = props;
  let listing = props.listing;
  // console.log(props);
  const listing_id = listing && listing.id;
  const listing_is_new = listing && listing.listingFlags && listing.listingFlags.isNew;
  const listing_media =
    listing &&
    listing.listingMedia &&
    listing.listingMedia.length > 0 &&
    listing.listingMedia.filter(lM => lM.type === 'image');
  const listing_img =
    listing_media.length > 0
      ? listing_media[0].url
      : 'https://res.cloudinary.com/gemspremium/image/upload/v1600885630/images_h4yc1x.png';
  // console.log(listing_img);
  const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
  const discount =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].discount;
  const cost =
    listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].cost;

  const handleSubmit = async (redirect = false) => {
    if (!currentUser) {
      history.push(`/login?redirectBack=${history && history.location && history.location.pathname}`);
    }

    const input = {
      consumerId: currentUser && currentUser.id,
      orderDetail: {
        vendorId: listing && listing.user && listing.user.id,
        modalName: 'listing',
        modalId: listing && listing.id,

        title: listing && listing.title,
        imageUrl: listing_img,
        cost: listing && listing.listingCostArray && listing.listingCostArray[0].cost,
        orderOptions: {
          quantity: 1
        }
      }
    };

    try {
      console.log('input', input);
      await addToCart(input);
      if (redirect) {
        history.push(`${ORDER_ROUTES.checkoutCart}`);
      }
    } catch (e) {
      message.error('Failed!');
      throw new Error(e);
    }

    // Add Message
    message.success('Success! Complete your Order.');
  };
  const bookmarkListing = async (id, userId) => {
    try {
      await props.addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <ListingWraper>
      <IfLoggedIn>
        <BookmarkComponent
          handleBookmark={() => bookmarkListing(listing.id, currentUser.id)}
          listing={listing}
          currentUser={currentUser}
        />
      </IfLoggedIn>
      {listing_is_new && <NewLabel>{'New'}</NewLabel>}
      <div align="center" style={{ padding: '20px', zIndex: 1, position: 'absolute', bottom: 0, width: '100%' }}>
        <AddButton block color="default" onClick={() => handleSubmit(false)}>
          Add to Cart
        </AddButton>
        <br />
        <br />
        <Button type="primary" block onClick={() => handleSubmit(true)}>
          <Icon type="shopping" /> Book Now
        </Button>
      </div>
      <Link className="listing-link" to={`${ROUTES.listingDetailLink}${listing_id}`}>
        <Card
          bodyStyle={{ margin: '0px' }}
          hoverable
          cover={
            <div
              style={{
                overflow: 'hidden',

                height: '230px',

                borderRadius: '8px 8px 0px 0px'
              }}
              align="center"
            >
              <img
                src={listing_img}
                style={{
                  height: '100%'
                }}
              />
            </div>
          }
        >
          <Meta
            title={
              <span
                style={{
                  fontSize: '20px',
                  overflow: 'hidden',
                  lineClamp: 1,
                  display: 'box'
                }}
              >
                {listing && listing.title}
              </span>
            }
            description={
              <Row style={{ height: '70px' }}>
                <Col span={12}>
                  {/* <h4>&#8377;{cost} per day</h4> */}
                  {isDiscount && cost ? (
                    <>
                      <CurrencyDisplay
                        style={{ display: 'inline' }}
                        input={(cost - cost * (discount / 100)).toFixed(2)}
                      />
                      <CurrencyDisplay
                        input={cost.toFixed(2)}
                        valueStyle={{
                          textDecoration: 'line-through',
                          fontSize: '15px'
                        }}
                      />
                    </>
                  ) : (
                    cost && <CurrencyDisplay input={cost.toFixed(2)} />
                  )}
                </Col>
                {isDiscount && (
                  <Col align="right" span={12} style={{}}>
                    <Statistic
                      title=""
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      value={discount && discount.toFixed(2)}
                      suffix={'%'}
                      prefix={<Icon type="arrow-down" />}
                    />
                  </Col>
                )}
              </Row>
            }
          />
          <br />
          <br />
          <br />
          <br />
        </Card>
      </Link>
    </ListingWraper>
  );
};

RelatedCardComponent.propTypes = {
  listing: PropTypes.object.isRequired,
  history: PropTypes.object,
  addToCart: PropTypes.func,
  addOrRemoveListingBookmark: PropTypes.func,
  currentUser: PropTypes.object,
  listingBookmarkStatus: PropTypes.bool
};

export default compose(withAddToCart, withToogleListingBookmark)(RelatedCardComponent);
