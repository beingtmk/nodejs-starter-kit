import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Popconfirm, message } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const { Meta } = Card;

const OrderTotalDate = styled(Col)`
  margin-top: 13px !important;
  margin-bottom: 2px !important;
`;

const BorderListzero = styled(Button)`
  border: 0 !important;
  padding: 0 !important;
  padding-right: 20px !important;
`;

class CartItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      myBooks: [],
      modal1Visible: false
    };
  }

  setModal1Visible = () => {
    this.setState({ modal1Visible: !this.state.modal1Visible });
  };

  cancel = () => {
    message.error('Click on No');
  };

  render() {
    const { item, edit, onSubmit, onDelete } = this.props;
    console.log('cart item', item);

    return (
      <Card
        type={this.props.inner && 'inner'}
        style={{ marginBottom: '24px' }}
        bodyStyle={{
          padding: '0px'
        }}
        title={<h3>{item.title}</h3>}
        extra={
          <>
            {edit && <Icon type="edit" onClick={() => this.setState({ visible: true })} />}
            {onDelete && (
              <Popconfirm
                title="Are you sure to delete this order?"
                onConfirm={() => onDelete(item.id)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <BorderListzero block>
                  <Icon type="delete" />
                </BorderListzero>
              </Popconfirm>
            )}
          </>
        }
      >
        <Row>
          <Col
            xs={{ span: 24 }}
            md={{ span: 9 }}
            xxl={{ span: 6 }}
            align="center"
            style={{ maxHeight: '200px', overflow: 'hidden' }}
          >
            <img alt="" src={item.thumbnail} width="100%" />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }} style={{ padding: '24px' }}>
            <h4>
              <strong>
                <span>Amount</span> &#8377; {`${item.cost} X ${item.quantity} = ${item.cost * item.quantity}`}
              </strong>
            </h4>
            <br />
            <h4>
              <span>Date</span> {item.date}
            </h4>
            <br />
            {/* <Link
              target='_blank'
              className='listing-link'
              to={`/public-profile/${user.id}`}
            >
              <Tooltip placement='topLeft' title="Visit User's Profile">
                <Meta
                  avatar={<Avatar src={sellerAvatar} />}
                  title={
                    <h4>
                      {seller}
                      <br />
                    </h4>
                  }
                  description={
                    <h5 style={{ marginTop: '-10px' }}>{user.username}</h5>
                  }
                />
              </Tooltip>
            </Link> */}
            <OrderTotalDate span={24}></OrderTotalDate>
          </Col>
        </Row>
      </Card>
    );
  }
}

CartItemComponent.propTypes = {
  item: PropTypes.object,
  onDelete: PropTypes.func
};

export default CartItemComponent;
