import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Divider, Icon, Button, Row, Col } from 'antd';

import { PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import MyOrderItemComponent from './MyOrderItemComponent';

const ButtonGroup = Button.Group;

const MyDeliveriesView = props => {
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

  const NoMyDeliveriesMessage = () => (
    <div align="center">
      <br />
      <br />
      <Empty description={t('orders.noListingsMsg')} />
    </div>
  );

  const renderFunc = (key, item) => (
    <MyOrderItemComponent key={key} item={item} history={history} currentUser={currentUser} />
  );
  const Icons = [<Icon type="appstore" />, <Icon type="hdd" />, <Icon type="shop" />, <Icon type="delete" />];
  const RenderMyDeliveries = () => (
    <div>
      {loading && <Spinner />}
      {!loading && <SuggestedListComponent {...props} items={orders} renderFunc={renderFunc} />}
    </div>
  );
  return (
    <PageLayout>
      <MetaTags title="MyDeliveries" description="" />

      <Row>
        <Col md={{ span: 8 }} sm={{ span: 7 }} xs={{ span: 24 }}>
          <Heading type="2" className="headingTop">
            <Icon type="solution" />
            &nbsp; My Deliveries
          </Heading>
          <br />
        </Col>
        <Col lg={0} md={0} align="center">
          {orderStates && orderStates.length !== 0 && (
            <ButtonGroup className="width100">
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
            </ButtonGroup>
          )}
        </Col>
        <Col lg={{ span: 16 }} md={{ span: 24 }} sm={0} xs={0} align="center">
          {orderStates && orderStates.length !== 0 && (
            <ButtonGroup className="width100">
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
      {orders && orders.totalCount ? <RenderMyDeliveries /> : <NoMyDeliveriesMessage />}
    </PageLayout>
  );
};

MyDeliveriesView.propTypes = {
  loading: PropTypes.bool,
  orders: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  orderStates: PropTypes.object,
  onUserStateChange: PropTypes.func,
  t: PropTypes.func
};

export default MyDeliveriesView;
