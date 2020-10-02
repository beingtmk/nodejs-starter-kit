import React from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { NO_IMG } from '@gqlapp/listing-common';
import { TotalPrice } from './CheckoutCartView';
import ROUTES from '../routes';

// const { Meta } = Card;

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

const CartItemComponent = props => {
  const {
    item
    // edit,
  } = props;
  // console.log(item);
  return (
    <Link to={`${ROUTES.orderDetailLink}${item.id}`}>
      <Card
        style={{
          marginBottom: '24px'
        }}
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
      >
        <Row type="flex">
          <Col span={24} align="center" style={{ maxHeight: '200px', overflow: 'hidden' }}>
            <img
              alt=""
              src={(item.orderDetails && item.orderDetails[0] && item.orderDetails[0].imageUrl) || NO_IMG}
              width="100%"
            />
          </Col>
          <Col span={18}>
            <div
              style={{
                padding: '15px',
                align: 'center',
                height: '100%',
                position: 'relative'
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
    </Link>
  );
};

CartItemComponent.propTypes = {
  item: PropTypes.object,
  deleteProduct: PropTypes.func
};

export default CartItemComponent;
