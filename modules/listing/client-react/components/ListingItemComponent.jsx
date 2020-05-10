import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar, Divider, Modal, Popconfirm, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const { Meta } = Card;

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
  z-index: 9;
`;

class EventItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { item, history } = this.props;
    const user = item.user;
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

    return (
      // <Link to={`/listing-detail/${item.id}`}>
      <Card
        title={<h3>{item.title}</h3>}
        style={{ marginBottom: '24px' }}
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
        extra={
          <Row>
            <Col span={12}>
              <BorderListzero block onClick={() => history.push(`/edit/listing/${item.id}`)}>
                <Icon type="edit" />
              </BorderListzero>
            </Col>
            <Col span={12}>
              <Popconfirm
                title="Are you sure to delete this Listing?"
                onConfirm={() => this.props.deleteProduct(item.id)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <BorderListzero block>
                  <Icon type="delete" />
                </BorderListzero>
              </Popconfirm>
            </Col>
          </Row>
        }
      >
        {' '}
        <Row gutter={24} type="flex" justify="space-around" align="middle">
          <Col
            xs={{ span: 24 }}
            md={{ span: 9 }}
            xxl={{ span: 6 }}
            align="center"
            style={{ maxHeight: '200px', overflow: 'hidden' }}
          >
            <img alt="" src={item.listingImage[0].imageUrl} width="100%" />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }}>
            <div
              style={{
                padding: '10px',
                align: 'center',
                height: '100%',
                position: 'relative'
              }}
            >
              <h3>{`Event-Id: ${item.id}`}</h3>
              <Divider style={{ margin: '5px 0px' }} />

              {/* <Link target="_blank" className="listing-link" to={`/public-profile/${user.id}`}>
                <Tooltip placement="topLeft" title="Visit User's Profile">
                  <Meta
                    avatar={<Avatar src={sellerAvatar} />}
                    title={
                      <h4>
                        {seller}
                        <br />
                      </h4>
                    }
                    description={<h5 style={{ marginTop: '-10px' }}>{user.username}</h5>}
                  />
                </Tooltip>
              </Link> */}
              <OrderTotalDate span={24}>
                <h4>
                  <OrderGrey sm={17} xs={24} />
                  <OrderGrey sm={7} xs={24}>
                    <span>
                      <strong>
                        <span>Total</span> &#8377; {item.listingCost.cost}
                      </strong>
                    </span>
                  </OrderGrey>
                </h4>
              </OrderTotalDate>
              <Row
                gutter={13}
                align="middle"
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px'
                }}
              ></Row>
            </div>
          </Col>
        </Row>
      </Card>
      // </Link>
    );
  }
}

EventItemComponent.propTypes = {
  item: PropTypes.object,
  deleteProduct: PropTypes.func
};

export default EventItemComponent;
