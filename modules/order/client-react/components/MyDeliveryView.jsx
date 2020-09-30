import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Divider, Icon, Button, Row, Col } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import SuggestedListComponent from './SuggestedListComponent';

import MyOrderItemComponent from './MyOrderItemComponent';

const ButtonGroup = Button.Group;
// const renderMetaData = () => (
//   <Helmet
//     title={`${settings.app.name} - ${'MyOrders'}`}
//     meta={[
//       {
//         name: 'description',
//         content: `${settings.app.name} - ${''}`,
//       },
//     ]}
//   />
// );
const ALL = '';
const MYLISTING = 'Completed';
const MYORDERS = 'Initiated';
const CANCELLED = 'Cancelled';
const MyOrdersView = props => {
  const { loading, orders, t, history, currentUser } = props;

  const NoMyOrdersMessage = () => <div align="center">{t('orders.noListingsMsg')}</div>;

  const renderFunc = (key, item) => (
    <MyOrderItemComponent key={key} item={item} history={history} currentUser={currentUser} />
  );
  const RenderMyOrders = () => (
    <div>
      <Row>
        <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
          <h2 className="headingTop">
            <Icon type="solution" />
            &nbsp; My Deliveries
          </h2>
          <br />
        </Col>
        <Col md={{ span: 14 }} sm={{ span: 17 }} xs={{ span: 24 }}>
          <ButtonGroup className="width100">
            <Button onClick={console.log('ALL')}>
              <Icon type="appstore" />
              {`${ALL === '' && 'ALL'}`}
            </Button>
            <Button onClick={console.log(MYLISTING)}>
              <Icon type="hdd" />
              {`${MYLISTING} `}
            </Button>
            <Button onClick={console.log(MYORDERS)}>
              <Icon type="shop" />
              {`${MYORDERS} `}
            </Button>
            <Button onClick={console.log(CANCELLED)}>
              <Icon type="delete" />
              {`${CANCELLED} `}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Divider style={{ margin: '5px 0px 10px' }} />
      {/* {showFilter && (
        <>
          <br />
          <ListingFilterComponent {...props} />
          <Divider />
        </>
        )} */}
      <SuggestedListComponent {...props} items={orders} renderFunc={renderFunc} />
    </div>
  );
  return (
    <PageLayout>
      {/* {renderMetaData()} */}
      {loading && (
        <div align="center">
          <br />
          <br />
          <Spin size="large" />
        </div>
      )}
      {orders && orders.totalCount ? <RenderMyOrders /> : <NoMyOrdersMessage />}
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  loading: PropTypes.bool,
  orders: PropTypes.object,
  t: PropTypes.func
};

export default MyOrdersView;
