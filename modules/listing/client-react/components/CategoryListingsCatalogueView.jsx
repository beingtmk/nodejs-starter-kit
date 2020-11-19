import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { SuggestedListComponent, Spinner, Empty, Divider, Button } from '@gqlapp/look-client-react';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';

const ListingCatalogueView = props => {
  const { t, loading, listings, history, currentUser, showFilter, getCart, cartLoading, onDelete, emptyLink } = props;

  const renderFunc = (key, listing) => {
    const cartItemArray =
      getCart && getCart.orderDetails && getCart.orderDetails.length > 0
        ? getCart.orderDetails.filter(oD => oD.modalId === listing.id)
        : [];
    return (
      <RelatedCardComponent
        key={key}
        listing={listing}
        history={history}
        modalName={'listing'}
        modalId={listing.id}
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
    <>
      {showFilter && (
        <>
          <br />
          <ListingFilterComponent showIsActive={false} filter={{ isActive: true }} orderBy={{}} {...props} />
          <Divider />
        </>
      )}
      {loading && <Spinner />}
      {!loading && listings && listings.totalCount ? (
        <RenderListings />
      ) : !loading ? (
        <NoListingsMessage t={t} emptyLink={emptyLink} />
      ) : null}
    </>
  );
};

ListingCatalogueView.propTypes = {
  t: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  showFilter: PropTypes.bool,
  listings: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  getCart: PropTypes.object,
  cartLoading: PropTypes.bool,
  onDelete: PropTypes.func,
  emptyLink: PropTypes.string
};

export default translate('listing')(ListingCatalogueView);

const NoListingsMessage = ({ t, emptyLink }) => (
  <div align="center">
    <br />
    <br />
    <Empty description={t('listing.noListingsMsg')}>
      <Link to={`${emptyLink}`}>
        <Button color="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);
NoListingsMessage.propTypes = { t: PropTypes.func, emptyLink: PropTypes.string };
