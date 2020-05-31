import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar, Divider, Modal, Popconfirm, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { PropTypes } from 'prop-types';

import AddToCartForm from './AddToCartForm';

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
            {edit && (
              <>
                <Icon type="edit" onClick={() => this.setState({ visible: true })} />

                <AddToCartForm
                  onSubmit={onSubmit}
                  details={item}
                  visible={this.state.visible}
                  handleVisible={() => this.setState({ visible: false })}
                />
              </>
            )}
            {this.props.deleteProduct && (
              <Popconfirm
                title="Are you sure to delete this order?"
                onConfirm={() => this.props.deleteProduct(item.id)}
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
        {' '}
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
            </h4>{' '}
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
  deleteProduct: PropTypes.func
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
