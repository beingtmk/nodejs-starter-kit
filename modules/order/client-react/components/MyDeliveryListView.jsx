import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Button, Icon } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import ListingItemComponent from './CartItemComponent';

// const ButtonGroup = Button.Group;

// const ALL = 'All';
// const MYLISTING = 'My Delivery';
// const MYORDERS = 'My orders';

class MyListingsView extends Component {
  // state = {
  //   status: ALL
  // };

  // FilterItems(e) {
  //   this.setState({ status: e });
  // }

  // classNamesgroup(e) {
  //   if (this.state.status === e) {
  //     return 'btnActive';
  //   } else {
  //     return 'btn';
  //   }
  // }
  render() {
    const { orders, loading, deleteListing, history, currentUser } = this.props;
    // const { status } = this.state;
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
              <h2 className="MyListHead">My Delivery</h2>
              <br />
            </Col>
          </Row>
          {console.log('orders', orders)}
          {orders &&
            orders.map(order =>
              order.delivery.map(item => (
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
