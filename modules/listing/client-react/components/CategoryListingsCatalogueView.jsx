import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { SuggestedListComponent, Spinner, Divider, Row, Col, EmptyComponent } from '@gqlapp/look-client-react';

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
  const RenderListings = ({ layout }) => (
    <div>
      <SuggestedListComponent
        {...props}
        endText={'listing'}
        grid={
          layout === 'vertical' && {
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4
          }
        }
        items={listings}
        renderFunc={renderFunc}
      />
    </div>
  );
  RenderListings.propTypes = { layout: PropTypes.string };

  const rednerChildren = (layout = 'horizontal') => {
    const span =
      layout === 'vertical'
        ? {
            spanFilter: { lg: 6, md: 8, sm: 24 },
            spanContent: { lg: 18, md: 16, sm: 24 }
          }
        : {
            spanFilter: { span: 24 },
            spanContent: { span: 24 }
          };
    return (
      <Row type="flex" gutter={[24, 24]}>
        <Col {...span.spanFilter}>
          {layout !== 'vertical' && <br />}
          {showFilter && (
            <ListingFilterComponent
              layout={layout}
              showIsActive={false}
              filter={{ isActive: true }}
              orderBy={{}}
              {...props}
            />
          )}
          {layout !== 'vertical' && <Divider />}
        </Col>
        <Col {...span.spanContent}>
          {loading && <Spinner />}
          {!loading && listings && listings.totalCount ? (
            <RenderListings layout={layout} />
          ) : !loading ? (
            <EmptyComponent description={t('listing.noListingsMsg')} emptyLink={emptyLink} />
          ) : null}
        </Col>
      </Row>
    );
  };

  return <>{rednerChildren('vertical')}</>;
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
