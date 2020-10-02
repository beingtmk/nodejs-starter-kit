import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Icon, Spin, Divider } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';
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
  const { t, loading, listings, history, currentUser, showFilter } = props;

  const renderFunc = (key, listing) => (
    <RelatedCardComponent key={key} listing={listing} history={history} currentUser={currentUser} />
  );
  const RenderListings = () => (
    <div>
      <h2 className="headingTop">
        <Icon type="solution" /> &nbsp; All Listings
      </h2>
      <Divider style={{ margin: '5px 0px 10px' }} />
      {showFilter && (
        <>
          <br />
          <ListingFilterComponent {...props} />
          <Divider />
        </>
      )}
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
          <Spin size="large" />
        </div>
      )}
      {listings && listings.totalCount ? <RenderListings /> : !loading ? <NoListingsMessage t={t} /> : null}
    </PageLayout>
  );
};

ListingCatalogueView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  showFilter: PropTypes.bool,
  listings: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object
};

export default translate('listing')(ListingCatalogueView);

const NoListingsMessage = ({ t }) => <div align="center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
