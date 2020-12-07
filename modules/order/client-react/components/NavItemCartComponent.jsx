import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';
import { Row, Col, Card, Icon, Button, ButtonGroup } from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

const AlignButton = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  margin: 60px 100px;
`;

const CartItemComponent = props => {
  const { item, onEdit, onDelete } = props;
  // var coverGrid = {
  //   xs: { span: 24 },
  //   md: { span: 9 },
  //   lg: { span: 6 },
  //   xxl: { span: 6 }
  // };

  // var infoGrid = {
  //   xs: { span: 24 },
  //   md: { span: 15 },
  //   lg: { span: 18 },
  //   xxl: { span: 18 }
  // };

  // if (props.mobile) {
  //   coverGrid = null;
  //   infoGrid = null;
  //   coverGrid = { span: 24 };
  //   infoGrid = { span: 24 };
  // }
  const handleQuantity = ele => {
    let quantity = item.orderOptions.quantity;
    if (ele === 'plus') quantity = quantity + 1;
    if (ele === 'minus') quantity = quantity - 1;
    console.log(quantity);
    if (quantity === 0) {
      onDelete(item.id);
    } else {
      onEdit(item.id, item.orderOptions && item.orderOptions.id, quantity);
    }
  };
  return (
    <div style={{ paddingRight: '10px' }}>
      <AlignButton>
        <ButtonGroup>
          <Button size="sm" icon={<Icon type="MinusOutlined" />} onClick={() => handleQuantity('minus')} />
          <Button size="sm" style={{ width: '24px', padding: '0px 0px' }}>
            {item.orderOptions.quantity}
          </Button>
          <Button size="sm" icon={<Icon type="PlusOutlined" />} onClick={() => handleQuantity('plus')} />
        </ButtonGroup>
      </AlignButton>
      <Link target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
        <Card bordered={false}>
          <Row style={{ paddingBottom: '0px' }}>
            <Col span={8} offset={0}>
              <img alt="" src={item.imageUrl || NO_IMG} style={{ height: '100px', width: '100%' }} />
            </Col>
            <Col span={10}>
              <h3>{item.title}</h3>
            </Col>
            <Col span={6} offset={0}>
              <Row justify="end">
                <strong>&#8377; {` ${item.cost * item.orderOptions.quantity}`}</strong>
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
};

CartItemComponent.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  mobile: PropTypes.func,
  t: PropTypes.func
};

export default CartItemComponent;
