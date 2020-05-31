import React from 'react';
import { Rate, Icon, Button, Row, Col, Card, Avatar, Divider, Popconfirm, message, Tooltip } from 'antd';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';

import Bag from '../Icons/shoppingbag.svg';
import Heart from '../Icons/heart.svg';

const BrandName = styled.div`
  /* Brand name */

  position: absolute;
  left: 0.61%;
  right: 50.61%;
  top: 69.62%;
  bottom: 25.38%;

  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;

  /* Gray */

  color: #9b9b9b;
`;

const Item = styled.div`
  /* Item */

  position: absolute;
  left: 0.61%;
  right: 4.88%;
  top: 75.77%;
  bottom: 16.92%;

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  /* Black */

  color: #222222;
`;

const NewPrice = styled.div`
  /* New price */

  position: absolute;
  left: 1.22%;
  right: 63.41%;
  top: 83.08%;
  bottom: 9.23%;

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* Black */

  color: #222222;
`;

const Number = styled.div`
  /* Number */

  position: absolute;
  width: 15px;
  height: 10px;
  left: 90px;
  top: 155px;

  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 8px;
  /* or 80% */

  /* Gray */

  color: #9b9b9b;
`;

const Rectangle = styled.div`
  /* Rectangle 85 */

  position: absolute;
  width: 30px;
  height: 30px;
  left: 93px;
  top: 115px;

  background: #f5f5f5;
  border: 1px solid rgba(35, 30, 54, 0.7);
  box-sizing: border-box;
  border-radius: 9px;
`;

const ShoppingBag = styled.div`
  /* Rectangle 86 */

  position: absolute;
  width: 30px;
  height: 30px;
  /* left: 129px; */
  right: 0px;
  top: 115px;

  background: #fc4c4c;
  box-sizing: border-box;
  border-radius: 9px;
`;

const ListingItemComponent = props => {
  const { loading, listing } = props;
  console.log('props', props);
  return (
    !loading && (
      <Link className="listing-link" to={`/listing-detail/${listing.id}`}>
        <Card
          style={{
            marginBottom: '24px',
            width: '164px',
            height: '260px',
            borderWidth: '0px',
            borderRadius: '8px'
          }}
          hoverable
          bodyStyle={{
            padding: '0px'
          }}
          cover={
            <div style={{ height: '130px', overflow: 'hidden' }}>
              <img alt="example" src={listing.listingImages[0].imageUrl} />
            </div>
          }
        >
          <Rectangle>
            <img
              alt=""
              src={Heart}
              style={{
                position: 'absolute',
                left: '7px',
                top: '7px',
                height: '15px',
                width: '15px'
              }}
            />
            {/* <Icon style={{ position: 'absolute', left: '7px', top: '7px' }} type="heart" theme="filled" /> */}
          </Rectangle>
          <ShoppingBag>
            <img
              alt=""
              src={Bag}
              style={{
                position: 'absolute',
                left: '7px',
                top: '7px',
                height: '15px',
                width: '15px'
              }}
            />
            {/* <Icon style={{ position: 'absolute', left: '7px', top: '7px' }} type="shopping" /> */}
          </ShoppingBag>
          <div style={{ width: '100px', height: '14px' }}>
            <Rate
              style={{
                position: 'absolute',
                width: '100px',
                height: '14px',
                left: '1px',
                top: '150px',
                fontSize: '10px'
              }}
              disabled
              defaultValue={listing.rating}
              className="font10"
            />
            <Number>({listing.rating})</Number>
          </div>
          <BrandName>{listing.description}</BrandName>
          <Item>{listing.title}</Item>
          <NewPrice>Rs.{listing.listingCost.cost}</NewPrice>
        </Card>
      </Link>
    )
  );
};

ListingItemComponent.propTypes = {
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  deleteProduct: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool
};

export default translate('demo')(ListingItemComponent);
