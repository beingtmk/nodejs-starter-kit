import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import ListingFormComponent from './ListingFormComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddListingView = ({ t, loading, addListing, currentUser }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      {loading ? (
        <Spin />
      ) : (
        <>
          <LayoutCenter>
            <ListingFormComponent cardTitle="Add Listing" t={t} onSubmit={addListing} currentUser={currentUser} />
          </LayoutCenter>
        </>
      )}
    </PageLayout>
  );
};

AddListingView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addListing: PropTypes.func
};

export default AddListingView;
