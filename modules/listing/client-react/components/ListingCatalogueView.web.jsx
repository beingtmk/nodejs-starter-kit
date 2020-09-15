import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Icon, Spin, Divider } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

import RelatedCardComponent from './RelatedCardComponent';
import SuggestedListComponent from './SuggestedListComponent';
import settings from '../../../../settings';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('list.title')}`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - ${t('list.meta')}`
      }
    ]}
  />
);

const ListingCatalogueView = props => {
  const { t, loading, listings, history, currentUser } = props;

  const renderFunc = (key, listing) => (
    <RelatedCardComponent key={key} listing={listing} history={history} currentUser={currentUser} />
  );
  const RenderListings = () => (
    <div>
      <h2 className="headingTop">
        <Icon type="solution" /> &nbsp; All Listings
      </h2>
      <Divider style={{ margin: '5px 0px 10px' }} />
      <SuggestedListComponent {...props} items={listings} renderFunc={renderFunc} />
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
    </PageLayout>
  );
};

ListingCatalogueView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  listings: PropTypes.object
};

export default translate('listing')(ListingCatalogueView);

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
