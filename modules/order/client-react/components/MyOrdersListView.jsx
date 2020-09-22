import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Button, Icon } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import ListingItemComponent from './CartItemComponent';

const ButtonGroup = Button.Group;

const ALL = 'All';
const MYLISTING = 'My Delivery';
const MYORDERS = 'My orders';

class MyListingsView extends Component {
  state = {
    status: ALL
  };

  FilterItems(e) {
    this.setState({ status: e });
  }

  classNamesgroup(e) {
    if (this.state.status === e) {
      return 'btnActive';
    } else {
      return 'btn';
    }
  }
  render() {
    const { orders, loading, deleteListing, history, currentUser } = this.props;
    const { status } = this.state;
    const delListing = async id => {
      try {
        await await deleteListing(id);
      } catch (e) {
        throw e;
      }
    };

    return (
      <>
        <Helmet
          title={`${settings.app.name} - My Listings`}
          meta={[
            {
              name: 'description',
              content: `${settings.app.name} - My Listings)}`
            }
          ]}
        />
        {/* {loading && !orders ? (
          <Spin />
        ) : ( */}
        <>
          <Row>
            <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
              <h2 className="MyListHead">My Orders</h2>
              <br />
            </Col>
            {/* <Col md={{ span: 14 }} sm={{ span: 17 }} xs={{ span: 24 }}>
              <ButtonGroup className="width100">
                <Button onClick={() => this.FilterItems(ALL)} className={this.classNamesgroup(ALL)}>
                  <Icon type="appstore" />
                  {`${ALL} (${orders ? orders.length : 0})`}
                </Button>
                <Button onClick={() => this.FilterItems(MYLISTING)} className={this.classNamesgroup(MYLISTING)}>
                  <Icon type="hdd" />
                  {`${MYLISTING} (${orders ? orders.map(item => ).delivery.length : 0})`}
                </Button>
                <Button onClick={() => this.FilterItems(MYORDERS)} className={this.classNamesgroup(MYORDERS)}>
                  <Icon type="shop" />
                  {`${MYORDERS} (${orders.orderDetails ? orders.orderDetails.length : 0})`}
                </Button>
              </ButtonGroup>
            </Col> */}
          </Row>
          {console.log('orders', orders)}
          {orders &&
            orders.map(order =>
              order.orderDetails.map(item => (
                <ListingItemComponent
                  history={history}
                  item={item}
                  deleteProduct={delListing}
                  currentUser={currentUser}
                />
              ))
            )}
        </>
        {/* )} */}
      </>
    );
  }
}

MyListingsView.propTypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool,
  deleteListing: PropTypes.func,
  currentUser: PropTypes.object,
  history: PropTypes.object
};

export default MyListingsView;
