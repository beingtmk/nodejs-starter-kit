import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Statistic, Card, Icon, Button } from 'antd';

import { compose } from '@gqlapp/core-common';
import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth';

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

class RelatedCardComponent extends Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }

  bookmarkListing = async (id, userId) => {
    try {
      // console.log('id', id, 'userId', userId);
      await this.props.addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  render() {
    // To Do: check if it is not present then set as default value
    const { currentUser } = this.props;
    let listing = this.props.listing;
    console.log(this.props);
    const listing_id = listing && listing.id;
    const listing_is_new = listing && listing.listingFlags && listing.listingFlags.isNew;
    const listing_media =
      listing &&
      listing.listingMedia &&
      listing.listingMedia.length > 0 &&
      listing.listingMedia.filter(lM => lM.type === 'image');
    const listing_img = listing_media.length > 0 && listing_media[0].url;
    console.log(listing_img);
    const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
    const discount =
      listing &&
      listing.listingCostArray &&
      listing.listingCostArray.length > 0 &&
      listing.listingCostArray[0].discount;
    const cost =
      listing && listing.listingCostArray && listing.listingCostArray.length > 0 && listing.listingCostArray[0].cost;
    console.log((cost - cost * (discount / 100)).toFixed(2));
    return (
      <ListingWraper>
        <IfLoggedIn>
          <BookmarkComponent
            handleBookmark={() => this.bookmarkListing(listing.id, currentUser.id)}
            listing={listing}
            currentUser={currentUser}
          />
        </IfLoggedIn>
        {listing_is_new && <NewLabel>{'New'}</NewLabel>}
        <div align="center" style={{ padding: '20px', zIndex: 1, position: 'absolute', bottom: 0, width: '100%' }}>
          <Button block onClick={() => this.handleSubmit(listing, false)}>
            <Icon type="plus-circle" /> Add to Cart
          </Button>
          <br />
          <br />
          <Button type="primary" block onClick={() => this.handleSubmit(listing, true)}>
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
                    {isDiscount ? (
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
                      <CurrencyDisplay input={cost.toFixed(2)} />
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
  }
}

RelatedCardComponent.propTypes = {
  listing: PropTypes.object.isRequired,
  addOrRemoveListingBookmark: PropTypes.func,
  currentUser: PropTypes.object,
  listingBookmarkStatus: PropTypes.bool
};

export default compose(withToogleListingBookmark)(RelatedCardComponent);
