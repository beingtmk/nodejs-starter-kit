import React from 'react';
import { Button, Card, Avatar, Divider, Popconfirm, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { NO_IMG } from '@gqlapp/listing-common';
import USER_ROUTES from '@gqlapp/user-client-react/routes';
import { Icon, Row, Col } from '@gqlapp/look-client-react';

import ROUTES from '../routes';

const AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
const { Meta } = Card;

const Align = styled.div`
  position: absolute;
  right: 0;
  margin: 16px;
`;

const ProfileAlign = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  right: 0;
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
  z-index: 9;
`;

const ListingItemComponent = props => {
  const cancel = () => {
    message.error('Click on No');
  };

  const { item, history, loading, deleteProduct, t } = props;

  const sellerFirstName = (item && item.user && item.user.profile && item.user.profile.firstName) || null;
  const sellerLastName = (item && item.user && item.user.profile && item.user.profile.lastName) || null;
  const listing_media =
    item && item.listingMedia && item.listingMedia.length > 0 && item.listingMedia.filter(lM => lM.type === 'image');

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
  const sellerAvatar = (item && item.user && item.user.profile && item.user.profile.avatar) || AVATAR;
  return (
    !loading && (
      <>
        <Align>
          <Row type="flex" justify="space-around" align="middle" gutter={12}>
            <Col span={12}>
              <BorderListzero block onClick={() => history.push(`${ROUTES.editLink}${item.id}`)}>
                <Icon type="EditOutlined" />
              </BorderListzero>
            </Col>
            {deleteProduct && (
              <Col span={12}>
                <Popconfirm
                  title="Are you sure to delete this Listing?"
                  onConfirm={() => deleteProduct(item.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <BorderListzero block>
                    <Icon type="DeleteOutlined" />
                  </BorderListzero>
                </Popconfirm>
              </Col>
            )}
          </Row>
        </Align>
        <ProfileAlign align="center">
          <Row type="flex" justify="space-around">
            <Col xxl={{ span: 9 }} lg={{ span: 5 }} md={{ span: 4 }} xs={{ span: 0 }}>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Link target="_blank" to={`${USER_ROUTES.userPublicProfileLink}${item.user.id}`}>
                <Tooltip placement="topLeft" title={t('listingItem.tooltip')}>
                  <Meta
                    avatar={<Avatar src={sellerAvatar} />}
                    title={
                      <h4>
                        {seller}
                        <br />
                      </h4>
                    }
                    description={<h5 style={{ marginTop: '-10px' }}>{item.user.username}</h5>}
                  />
                </Tooltip>
              </Link>
            </Col>
          </Row>
        </ProfileAlign>
        <Link to={`${ROUTES.listingDetailLink}${item.id}`}>
          <Card
            type="inner"
            title={<h3>{item.title}</h3>}
            style={{ marginBottom: '24px' }}
            hoverable
            bodyStyle={{
              padding: '0px'
            }}
          >
            <Row gutter={24} type="flex" justify="space-around">
              <Col
                xs={{ span: 24 }}
                md={{ span: 9 }}
                xxl={{ span: 6 }}
                align="center"
                style={{ maxHeight: '200px', overflow: 'hidden' }}
              >
                <img alt="" src={(listing_media.length > 0 && listing_media[0].url) || NO_IMG} width="100%" />
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
                  <h3>{`Listing-Id: ${item.id}`}</h3>
                  <Divider style={{ margin: '5px 0px' }} />

                  <OrderTotalDate span={24}>
                    <h4>
                      <OrderGrey sm={17} xs={24} />
                      <Col sm={0} xs={0} lg={24}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Col>
                      <OrderGrey sm={7} xs={24} lg={24} align="right">
                        <span>
                          <strong>
                            <span>{t('listingItem.cost')}</span> &#8377; {item.listingCostArray[0].cost}
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
        </Link>
      </>
    )
  );
};

ListingItemComponent.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.object,
  deleteProduct: PropTypes.func,
  history: PropTypes.object,
  loading: PropTypes.bool,
  t: PropTypes.func
};

export default ListingItemComponent;
