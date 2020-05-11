import React, { Component, useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Row, Col, Button, Icon, Divider } from 'antd';

import settings from '../../../../settings';
import ListingItemComponent from './ListingItemComponent';

class MyListingsView extends Component {
  render() {
    const { user, userListings, loading, currentUser, history } = this.props;

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
        {loading && !userListings ? (
          <Spin />
        ) : (
          <>
            <Row>
              <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
                <h2 className="MyListHead">{user.username}'s Listings</h2>
                <br />
              </Col>
            </Row>

            {userListings && userListings.map(listing => <ListingItemComponent history={history} item={listing} />)}
          </>
        )}
      </>
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
