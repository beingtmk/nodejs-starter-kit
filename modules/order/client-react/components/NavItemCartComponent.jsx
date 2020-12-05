import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteIcon, Row, Col, Card, ModalDrawer, Icon, Button, ButtonGroup } from '@gqlapp/look-client-react';

import styled from 'styled-components';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';
import { NO_IMG } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';

import EditCart from './EditCart';

const Align = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  padding-right: 10px;
  margin: 16px 40px;
`;
const AlignButton = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  margin: 60px 100px;
`;

const CartItemComponent = props => {
  const { t, item, onEdit, onDelete, currentUser } = props;
  // console.log('cart item', props);
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

  return (
    <div style={{ paddingRight: '10px' }}>
      <Align>
        <Row type="flex" justify="space-around" align="middle" gutter={12}>
          {onEdit && (
            <Col span={8}>
              <ModalDrawer
                buttonText={<Icon type="EditOutlined" />}
                modalTitle="Edit Item"
                height="auto"
                shape="circle"
                size="large"
                type="default"
              >
                <EditCart
                  modalId={item.modalId}
                  currentUser={currentUser}
                  modalName={MODAL[1].value}
                  onEdit={onEdit}
                  item={item}
                  t={t}
                />
              </ModalDrawer>
            </Col>
          )}

          <Col span={8}>
            {onDelete && (
              <DeleteIcon
                title="Are you sure to delete this order?"
                onClick={() => props.onDelete(item.id)}
                size="lg"
              />
            )}
          </Col>
        </Row>
      </Align>
      <AlignButton>
        <ButtonGroup>
          <Button size="sm" icon={<Icon type="MinusOutlined" />} onClick={() => console.log('object')} />
          <Button size="sm" style={{ width: '24px', padding: '0px 0px' }}>
            {item.orderOptions.quantity}
          </Button>
          <Button size="sm" icon={<Icon type="PlusOutlined" />} />
        </ButtonGroup>
      </AlignButton>
      <Link target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
        <Card bordered={false}>
          <Row style={{ paddingBottom: '0px' }}>
            <Col span={8} offset={0}>
              <img alt="" src={item.imageUrl || NO_IMG} style={{ height: '100px', width: '100%' }} />
            </Col>
            <Col offset={2} span={10}>
              <h3>{item.title}</h3>
            </Col>
            <Col span={4} offset={0}>
              <strong>&#8377; {` ${item.cost * item.orderOptions.quantity}`}</strong>
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
