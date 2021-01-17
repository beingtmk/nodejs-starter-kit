import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Divider,
  Icon,
  Row,
  Col,
  PageLayout,
  Heading,
  MetaTags,
  EmptyComponent,
  Button,
  SuggestedListComponent,
  Spinner
} from '@gqlapp/look-client-react';
import { MODAL } from '@gqlapp/review-common';

import settings from '@gqlapp/config';
import ROUTES from '../routes';
import ListingItemComponent from './ListingItemComponent';
import ListingFilterComponent from './ListingFilterComponent';

const MyListingsView = props => {
  const { listings, loading, onDelete, history, t, currentUser } = props;

  const renderFunc = (key, listing) => (
    <>
      <ListingItemComponent
        t={t}
        key={key}
        history={history}
        item={listing}
        deleteProduct={onDelete}
        currentUser={currentUser}
        modalName={MODAL[1].value}
        modalId={listing.id}
      />
      <Divider />
    </>
  );
  const RenderListings = () => (
    <>
      <Row>
        <Col span={12}>
          <Heading type="2">
            <Icon type="SolutionOutlined" />
            {t('myListings.heading')}
          </Heading>
        </Col>
        <Col span={12} align="right">
          <Link to={`${ROUTES.add}`}>
            <Button color="primary">
              <Icon type="PlusOutlined" /> {t('myListings.btn.add')}
            </Button>
          </Link>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      {/* <Divider style={{ margin: '5px 0px 10px' }} /> */}
      <SuggestedListComponent
        endText={'listing'}
        grid={{
          gutter: 24,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        {...props}
        items={listings}
        renderFunc={renderFunc}
      />
    </>
  );

  const renderChildren = (layout = 'horizontal') => {
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
          {true && (
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
            !loading && <EmptyComponent description={t('listing.noListingsMsg')} emptyLink={`${ROUTES.add}`} />
          ) : null}
        </Col>
      </Row>
    );
  };

  return (
    <PageLayout>
      <MetaTags title={t('myListings.title')} description={`${settings.app.name} - ${t('myListings.title')})}`} />

      {/* {loading && <Spinner />} */}
      {renderChildren('vertical')}
    </PageLayout>
  );
};

MyListingsView.propTypes = {
  listings: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.object,
  currentUser: PropTypes.object
};

export default MyListingsView;
