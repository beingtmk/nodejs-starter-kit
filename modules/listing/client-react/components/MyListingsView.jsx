import React, { Component, useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Button, Icon, Divider } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import ListingItemComponent from './ListingItemComponent';

const ButtonGroup = Button.Group;

const ALL = 'All';
const MYLISTING = 'My Listing';
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
    const { userListings, loading, deleteListing, currentUser, history } = this.props;
    const { status } = this.state;
    const delListing = async id => {
      try {
        await await deleteListing(id);
      } catch (e) {
        throw e;
      }
    };

    return (
      <PageLayout>
        <Helmet
          title={`${settings.app.name} - My Listings`}
          meta={[
            {
              name: 'description',
              content: `${settings.app.name} - My Listings)}`
            }
          ]}
        />
        {loading && !userListings ? (
          <Spin />
        ) : (
          <>
            <Row>
              <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
                <h2 className="MyListHead">My Listing</h2>
                <br />
              </Col>
              <Col md={{ span: 14 }} sm={{ span: 17 }} xs={{ span: 24 }}>
                <ButtonGroup className="width100">
                  <Button onClick={() => this.FilterItems(ALL)} className={this.classNamesgroup(ALL)}>
                    <Icon type="appstore" />
                    {`${ALL} (${userListings ? userListings.length : 0})`}
                    {/* {`${ALL} (${userListings ? userListings.length + userListings.myOrders.length : 0})`} */}
                  </Button>
                  <Button onClick={() => this.FilterItems(MYLISTING)} className={this.classNamesgroup(MYLISTING)}>
                    <Icon type="hdd" />
                    {`${MYLISTING} (${userListings ? userListings.length : 0})`}
                  </Button>
                  <Button onClick={() => this.FilterItems(MYORDERS)} className={this.classNamesgroup(MYORDERS)}>
                    <Icon type="shop" />
                    {`${MYORDERS} (${userListings.myOrders ? userListings.myOrders.length : 0})`}
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
            {currentUser.profile.userType === 'MENTOR' && (
              <Button type="primary" href="/add-event">
                Add Event
              </Button>
            )}
            {console.log('status', status)}

            {status === ALL && (
              <>
                {userListings &&
                  userListings.map(listing => (
                    <ListingItemComponent history={history} item={listing} deleteProduct={delListing} />
                  ))}
                {/* <Divider />
                <h3>My Orders</h3>
                {userListings &&
                  userListings.myOrders.map(order =>
                    order.orderDetails.map(item => (
                      <CartItemComponent
                        item={item}
                        // deleteProduct={props.deleteProduct}
                      />
                    ))
                  )} */}
              </>
            )}
            {userListings &&
              status === MYLISTING &&
              userListings.map(listing => (
                <ListingItemComponent history={history} item={listing} deleteProduct={delListing} />
              ))}

            {/* {userListings &&
              status === MYORDERS &&
              userListings.myOrders.map(order =>
                order.orderDetails.map(item => (
                  <CartItemComponent
                    item={item}
                    // deleteProduct={props.deleteProduct}
                  />
                ))
              )} */}
          </>
        )}
      </PageLayout>
    );
  }
}

MyListingsView.propTypes = {
  userListings: PropTypes.array,
  loading: PropTypes.bool,
  deleteListing: PropTypes.func,
  currentUser: PropTypes.object
};

export default MyListingsView;
