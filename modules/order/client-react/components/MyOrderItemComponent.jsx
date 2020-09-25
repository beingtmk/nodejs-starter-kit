import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar, Divider, Modal, Popconfirm, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { PropTypes } from 'prop-types';

import AddToCartForm from './AddToCartForm';
import { TotalPrice } from './CheckoutCartView';

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

const { Meta } = Card;

const RelCardMeta = styled(Meta)`
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

const OrderTotalDate = styled(Col)`
  margin-top: 13px !important;
  margin-bottom: 2px !important;
`;

const OrderGrey = styled(Col)`
  color: #676767;
  position: relative;
  bottom: 10px;
`;

const BorderListzero = styled(Button)`
  border: 0 !important;
  padding: 0 !important;
  padding-right: 20px !important;
`;
const Price = styled(Row)`
  height: 100%;
  color: white;
  background-color: #1890ff;
`;
const StatusText = styled.div`
  color: ${props => props.status === 'completed' && '#2aa952'};
  color: ${props => props.status === 'initiated' && '#F79E1B'};
  color: ${props => props.status === 'cancelled' && 'red'};
`;
class CartItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      myBooks: [],
      modal1Visible: false,
    };
  }

  setModal1Visible = () => {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  };

  cancel = () => {
    message.error('Click on No');
  };

  // disabledDate(current) {
  //   if (
  //     (current && current.valueOf() < Date.now()) ||
  //     this.state.myBooks.some(row => row === moment(current._d).format('YYYY-MM-DD'))
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { item, edit, onSubmit } = this.props;
    console.log(item);
    return (
      <Card
        style={{
          marginBottom: '24px',
        }}
        hoverable
        bodyStyle={{
          padding: '0px',
        }}
      >
        <Row type="flex">
          <Col span={24} align="center" style={{ maxHeight: '200px', overflow: 'hidden' }}>
            <img alt="" src={item.orderDetails && item.orderDetails[0] && item.orderDetails[0].imageUrl} width="100%" />
          </Col>
          <Col span={18}>
            <div
              style={{
                padding: '15px',
                align: 'center',
                height: '100%',
                position: 'relative',
              }}
            >
              <Col span={24}>
                <h2>Order Id: {item.id}</h2>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="start">
                  <h3>Items: {item.orderDetails && item.orderDetails.length}</h3>
                </Row>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="end">
                  <h3>
                    <StatusText status={item.orderState && item.orderState.state.toLowerCase()}>
                      {item.orderState && item.orderState.state}
                    </StatusText>
                  </h3>
                </Row>
              </Col>
            </div>
          </Col>
          <Col span={6}>
            <Price type="flex" justify="center" align="middle">
              <span>
                <strong>
                  &#8377;
                  {TotalPrice(item.orderDetails)}
                </strong>
                <br />
                <span>Total</span>
              </span>
            </Price>
          </Col>
        </Row>
      </Card>
    );
  }
}

CartItemComponent.propTypes = {
  item: PropTypes.object,
  deleteProduct: PropTypes.func,
};

export default // compose(
//   graphql(DISABLED_DATES, {
//     options: props => {
//       return {
//         variables: { listingId: props.item.listing.id }
//       };
//     },
//     props({ data: { loading, error, disabledDates, subscribeToMore, updateQuery, refetch } }) {
//       if (error) throw new Error(error);
//       return { loading, disabledDates, subscribeToMore, updateQuery, refetch };
//     }
//   }),
//   graphql(BOOKED_DATES, {
//     options: props => {
//       return {
//         variables: { listingId: props.item.listing.id }
//       };
//     },
//     props({ data: { loading, error, orderDetailsList } }) {
//       if (error) throw new Error(error);
//       return { bookLoading: loading, orderDetailsList };
//     }
//   })
// )(
CartItemComponent;
// );
