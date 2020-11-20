import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Icon,
  PageLayout,
  Heading,
  MetaTags,
  Row,
  Col,
  Divider,
  Empty,
  SuggestedListComponent,
  Spinner,
  Button,
  ButtonGroup
} from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';

import MyOrderItemComponent from './MyOrderItemComponent';

const MyOrdersView = props => {
  const [status, setStatus] = React.useState('');
  const { loading, orders, t, history, currentUser, orderStates, onUserStateChange } = props;

  function filterItems(e) {
    setStatus(e.toUpperCase());
    onUserStateChange(currentUser && currentUser.id, e);
  }

  function classNamesgroup(e) {
    if (status === e.toUpperCase()) {
      return 'primary';
    } else {
      return '';
    }
  }

  const NoMyOrdersMessage = () => (
    <div align="center">
      <br />
      <br />
      <Empty description={t('noOrdersMsg')}>
        <Link to={`${LISTING_ROUTES.listingCatalogue}`}>
          <Button type="primary">Add</Button>
        </Link>
      </Empty>
    </div>
  );

  const renderFunc = (key, item) => (
    <MyOrderItemComponent key={key} item={item} history={history} currentUser={currentUser} t={t} />
  );
  const Icons = [
    <Icon type="AppstoreOutlined" />,
    <Icon type="HddOutlined" />,
    <Icon type="ShopOutlined" />,
    <Icon type="ToTopOutlined" />,
    <Icon type="DeleteOutlined" />
  ];
  const RenderMyOrders = () => (
    <div>
      {loading && <Spinner />}
      {!loading && <SuggestedListComponent {...props} items={orders} renderFunc={renderFunc} />}
    </div>
  );
  return (
    <PageLayout>
      <MetaTags title=" MyOrders" description="" />

      <Row>
        <Col lg={{ span: 8 }} md={{ span: 8 }} xs={{ span: 24 }}>
          <Heading type="2" className="headingTop">
            <Icon type="SolutionOutlined" />
            {t('myOrders')}
          </Heading>
          <br />
        </Col>
        <Col lg={0} md={0} xs={24} align="center">
          {orderStates && orderStates.length !== 0 && (
            <>
              <Button block onClick={() => filterItems('')} type={classNamesgroup('')}>
                {Icons[0]}
                ALL
              </Button>
              {orderStates.map((oS, i) => (
                <Button key={i} block onClick={() => filterItems(oS.state)} type={classNamesgroup(oS.state)}>
                  {Icons[i + 1]}
                  {oS.state}
                </Button>
              ))}
            </>
          )}
        </Col>
        <Col lg={{ span: 16 }} md={{ span: 24 }} xs={0} align="center">
          {orderStates && orderStates.length !== 0 && (
            <ButtonGroup>
              <Button onClick={() => filterItems('')} type={classNamesgroup('')}>
                {Icons[0]}
                ALL
              </Button>
              {orderStates.map((oS, i) => (
                <Button key={i} onClick={() => filterItems(oS.state)} type={classNamesgroup(oS.state)}>
                  {Icons[i + 1]}
                  {oS.state}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Col>
      </Row>
      <Divider />
      {orders && orders.totalCount ? <RenderMyOrders /> : <NoMyOrdersMessage />}
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  loading: PropTypes.bool,
  orders: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  orderStates: PropTypes.array,
  onUserStateChange: PropTypes.func,
  t: PropTypes.func
};

export default MyOrdersView;
