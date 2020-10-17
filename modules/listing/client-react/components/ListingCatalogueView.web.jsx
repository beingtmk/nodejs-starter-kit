import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { MetaTags, PageLayout, Heading } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';
import settings from '../../../../settings';

const ListingCatalogueView = props => {
  const { t, loading, listings, history, currentUser, showFilter, getCart, cartLoading, onDelete } = props;

  const renderFunc = (key, listing) => {
    const cartItemArray = getCart ? getCart.orderDetails.filter(oD => oD.modalId === listing.id) : [];
    return (
      <RelatedCardComponent
        key={key}
        listing={listing}
        history={history}
        currentUser={currentUser}
        inCart={cartItemArray.length === 0}
        loading={cartLoading}
        onDelete={() => onDelete(cartItemArray[0].id)}
      />
    );
  };
  const RenderListings = () => (
    <div>
      <SuggestedListComponent {...props} items={listings} renderFunc={renderFunc} />
    </div>
  );

  return (
    <PageLayout>
      <MetaTags title={t('list.title')} description={`${settings.app.name} - ${t('list.meta')}`} />
      <Heading type="2">
        <Icon type="solution" /> &nbsp; All Listings
      </Heading>
      <Divider style={{ margin: '5px 0px 10px' }} />
      {showFilter && (
        <>
          <br />
          <ListingFilterComponent showIsActive={false} {...props} filter={{ isActive: true }} orderBy={{}} />
          <Divider />
        </>
      )}
      {loading && <Spinner />}
      {!loading && listings && listings.totalCount ? <RenderListings /> : !loading ? <NoListingsMessage t={t} /> : null}
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
