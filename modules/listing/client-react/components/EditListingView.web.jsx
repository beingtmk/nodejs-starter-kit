import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ListingFormComponent from './ListingFormComponent.web';

const EditListingView = props => {
  const renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );
  const { t, listing, loading, editListing, currentUser } = props;

  return (
    <>
      <PageLayout>
        {renderMetaData(t)}
        {loading ? (
          <Spin />
        ) : (
          <>
            <LayoutCenter>
              <ListingFormComponent
                cardTitle="Edit Listing"
                t={t}
                listing={listing}
                onSubmit={editListing}
                currentUser={currentUser}
              />
            </LayoutCenter>
          </>
        )}
      </PageLayout>
    </>
  );
};

EditListingView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  editListing: PropTypes.func
};

export default EditListingView;
