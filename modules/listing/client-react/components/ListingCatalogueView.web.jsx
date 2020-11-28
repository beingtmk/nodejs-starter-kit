import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Icon,
  MetaTags,
  PageLayout,
  Heading,
  Empty,
  Divider,
  Button,
  SuggestedListComponent,
  Spinner,
  Col,
  Row
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import CategoryNavBarComponent from '@gqlapp/category-client-react/containers/CategoryNavBarComponent';
import { MODAL } from '@gqlapp/review-common';

import RelatedCardComponent from './RelatedCardComponent';
import ListingFilterComponent from './ListingFilterComponent.web';

const ListingCatalogueView = props => {
  const {
    t,
    loading,
    listings,
    history,
    title,
    currentUser,
    showFilter,
    getCart,
    cartLoading,
    onDelete,
    emptyLink
  } = props;

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
        grid={
          layout === 'vertical' && {
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3
          }
        }
        items={listings}
        renderFunc={renderFunc}
      />
    </div>
  );
  RenderListings.propTypes = { layout: PropTypes.string };

  const renderChildren = (layout = 'horizontal') => {
    const span =
      layout === 'vertical'
        ? {
            spanFilter: { lg: 6, md: 6, sm: 24 },
            spanContent: { lg: 18, md: 18, sm: 24 }
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
            <NoListingsMessage t={t} emptyLink={emptyLink} />
          ) : null}
        </Col>
      </Row>
    );
  };

  return (
    <PageLayout>
      <MetaTags title={t('list.title')} description={`${settings.app.name} - ${t('list.meta')}`} />
      <Row>
        <Col xs={0} md={0} lg={24}>
          <CategoryNavBarComponent filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }} />
        </Col>
        <Col xs={24} md={24} lg={0}>
          <CategoryNavBarComponent
            filter={{ isActive: true, isNavbar: true, modalName: MODAL[1].value }}
            mobile={true}
          />
        </Col>
      </Row>
      <Heading type="2">
        <Icon type="SolutionOutlined" /> &nbsp; {title}
      </Heading>
      <Divider style={{ margin: '5px 0px 10px' }} />
      {renderChildren('vertical')}
      {/* {renderChildren()} */}
    </PageLayout>
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
