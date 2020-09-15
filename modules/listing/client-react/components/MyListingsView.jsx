import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Icon, Spin, Divider } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import ListingItemComponent from './ListingItemComponent';
import SuggestedListComponent from './SuggestedListComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - My Listings`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - My Listings)}`
      }
    ]}
  />
);

const MyListingsView = props => {
  const { listings, loading, onDelete, history, currentUser, t } = props;

  const renderFunc = (key, listing) => (
    // <RelatedCardComponent key={key} listing={listing} history={history} currentUser={currentUser} />
    <ListingItemComponent
      key={key}
      history={history}
      item={listing}
      deleteProduct={onDelete}
      currentUser={currentUser}
    />
  );
  const RenderListings = () => (
    <div>
      <h2 className="headingTop">
        <Icon type="solution" /> &nbsp; All Listings
      </h2>
      <Divider style={{ margin: '5px 0px 10px' }} />
      <SuggestedListComponent
        grid={{
          gutter: 24,
          sm: 1,
          md: 1,
          lg: 1
        }}
        {...props}
        items={listings}
        renderFunc={renderFunc}
      />
    </div>
  );
  return (
    <PageLayout>
      {renderMetaData(t)}
      {loading && (
        <div align="center">
          <br />
          <br />
          <br />
          <Spin />
        </div>
      )}
      {listings && listings.totalCount ? <RenderListings /> : !loading ? <NoListingsMessage t={t} /> : null}
      <Icon type="solution" /> &nbsp; My Listing
    </PageLayout>
  );
};

MyListingsView.propTypes = {
  listings: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  currentUser: PropTypes.object,
  history: PropTypes.object
};

export default MyListingsView;
