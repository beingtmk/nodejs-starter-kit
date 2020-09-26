import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Spin, Row, Col } from 'antd';

import settings from '../../../../settings';
import ListingItemComponent from './ListingItemComponent';

const MyListingsView = props => {
  const { user, userListings, loading, history, currentUser, deleteListing } = props;

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
        <Spin size="large" />
      ) : (
        <>
          <Row>
            <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
              <h2 className="MyListHead">{user.username}&apos;s Listings</h2>
              <br />
            </Col>
          </Row>

          {userListings &&
            userListings.map(listing => (
              <ListingItemComponent
                history={history}
                item={listing}
                currentUser={currentUser}
                deleteProduct={deleteListing}
              />
            ))}
        </>
      )}
    </>
  );
};

MyListingsView.propTypes = {
  currentUser: PropTypes.object,
  user: PropTypes.object,
  userListings: PropTypes.array,
  loading: PropTypes.bool,
  deleteListing: PropTypes.func,
  history: PropTypes.object
};

export default MyListingsView;
