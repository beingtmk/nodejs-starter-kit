import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { displayDataCheck } from '@gqlapp/listing-client-react';
import { Row, Col, Rate, Avatar, Divider, Tooltip, Card, CardMeta } from '@gqlapp/look-client-react';

const OrderCard = styled(Card)`
  margin: 0px 0px 15px 0px !important;
  border-radius: 10px !important;
  min-width: 100%;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3);
`;

const OrderHorizontalImage = styled.img`
  height: 100%;
`;

const OrderCardCol = styled(Col)`
  overflow: hidden !important;
  border-radius: 10px 0px 0px 10px !important;

  object-fit: cover;
  height: 250px;
`;

const ItemName = styled.h2`
  font-size: 13px;
  line-height: 14px;
  color: #4a4a4a;
  letter-spacing: 0.1px;
  text-align: justify;
`;

const Title = styled.span`
  margin-left: -5px;
  margin-right: -5px;
`;

const RelCardMeta = styled(CardMeta)`
  margin-top: 20px !important;
  padding: 0 !important;
`;

const CatalogUserName = styled.h3`
  font-size: 13px;
  line-height: 14px;
  margin: 0;
`;

const CardRate = styled(Rate)`
  color: #23b195 !important;
  font-size: 11px !important;
`;

// const OrderTotalDate = styled(Col)`
//   margin-top: 13px !important;
//   margin-bottom: 2px !important;
// `;

// const OrderGrey = styled(Col)`
//   color: #676767;
//   position: relative;
//   bottom: 10px;
// `;

// const BorderListzero = styled(Button)`
//   border: 0 !important;
//   padding: 0 !important;
//   padding-right: 20px !important;
// `;

class CheckoutStepsOrderComponent extends Component {
  render() {
    const item = this.props.item;
    // console.log(item);

    const event = item && item.events;

    const user = event.user;

    const sellerFirstName = (user && user.profile && user.profile.firstName) || null;
    const sellerLastName = (user && user.profile && user.profile.lastName) || null;
    const sellerName = (f, l) => {
      if (f && l) {
        return `${f} ${l}`;
      } else if (!f || !l) {
        if (f) {
          return f;
        } else {
          return l;
        }
      } else {
        return 'Name Not Provided';
      }
    };
    const seller = sellerName(sellerFirstName, sellerLastName);
    const sellerAvatar =
      (user && user.profile && user.profile.avatar) ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const rating = (user && user.profile && user.profile.rating) || null;

    const item_img = event.eventPoster;
    // console.log('item', item);
    return (
      <OrderCard
        bodyStyle={{
          padding: '0px'
        }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <OrderCardCol xs={{ span: 24 }} md={{ span: 9 }} xxl={{ span: 6 }} align="center">
            <OrderHorizontalImage alt="" src={item_img} />
          </OrderCardCol>
          <OrderCardCol
            xs={{ span: 24 }}
            md={{ span: 15 }}
            xxl={{ span: 18 }}
            style={{
              height: '200px !important',
              overflow: 'hidden !important',
              borderRadius: '0px 10px 10px 0px !important',

              objectFit: 'cover'
            }}
          >
            <div
              style={{
                padding: '10px',
                align: 'center',
                height: '100%',
                position: 'relative'
              }}
            >
              <h3>{`Order-Id: ${displayDataCheck(item.orderId)}`}</h3>
              <Divider style={{ margin: '5px 0px' }} />

              <ItemName>
                <span>
                  <b>{<Title>{displayDataCheck(event.title)}</Title>}</b>
                </span>
              </ItemName>

              <Link className="event-link" to={`/public-profile/${user.id}`}>
                {' '}
                <Tooltip placement="topLeft" title="Visit User's Profile">
                  <RelCardMeta
                    avatar={<Avatar src={sellerAvatar} />}
                    title={
                      <CatalogUserName>
                        {displayDataCheck(seller)}
                        <br />
                        {rating ? <CardRate disabled defaultValue={Number(rating)} /> : <a>Not Reviewed</a>}
                      </CatalogUserName>
                    }
                  />
                </Tooltip>
              </Link>
              <Divider style={{ margin: '10px 0px 5px 0' }} />
              <h5>Price : {displayDataCheck(item.events.price)}</h5>
            </div>
          </OrderCardCol>
        </Row>
      </OrderCard>
    );
  }
}

CheckoutStepsOrderComponent.propTypes = {
  item: PropTypes.object
};
export default CheckoutStepsOrderComponent;
