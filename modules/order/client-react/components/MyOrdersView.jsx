import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Divider, Icon } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/listing-client-react/components/SuggestedListComponent';
import settings from '@gqlapp/config';

import ListingItemComponent from './CartItemComponent';
import MyOrdersListView from './MyOrdersListView';

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

const MyOrdersView = props => {
  const { loading, orders, t, history, currentUser } = props;

  const NoMyOrdersMessage = () => <div align="center">{t('orders.noListingsMsg')}</div>;
  const renderFunc = (key, item) => (
    // Add MyOrderItem component here
    <h1>hello</h1>
    // <ListingItemComponent key={key} item={item} history={history} currentUser={currentUser} />
  );
  const RenderMyOrders = () => (
    <div>
      <h2 className="headingTop">
        <Icon type="solution" /> &nbsp; My Orders
      </h2>
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
          <Spin />
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
