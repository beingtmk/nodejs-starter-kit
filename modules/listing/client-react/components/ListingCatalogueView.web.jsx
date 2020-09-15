import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Icon, Spin, Divider } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';

// import { Row, Col, Divider } from 'antd';
import SuggestedCardListComponent from './SuggestedCardListComponent';
import settings from '../../../../settings';

// const { itemsNumber, type } = settings.pagination.web;

// const Loading = ({ t }) => <Loader text={t('listing.loadMsg')} />;
// Loading.propTypes = { t: PropTypes.func };

const ListingCatalogueView = props => {
  const { t, loading, listings } = props;

  const RenderListings = () => (
    <div>
      <h2 className="headingTop">
        <Icon type="solution" /> &nbsp; All Listings
      </h2>
      <Divider style={{ margin: '5px 0px 10px' }} />
      <SuggestedCardListComponent {...props} />
    </div>
  );

  return (
    <PageLayout>
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('list.meta')}`
          }
        ]}
      />
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
