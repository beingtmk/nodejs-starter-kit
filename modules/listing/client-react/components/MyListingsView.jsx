import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Button, Spin } from 'antd';

import { Row, Col, PageLayout } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';

import settings from '../../../../settings';
import ROUTES from '../routes';
import ListingItemComponent from './ListingItemComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - My Listings`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - My Listings)}`
      }
    ]}
  />
);

const MyListingsView = props => {
  const { listings, loading, onDelete, history, t } = props;

  const renderFunc = (key, listing) => (
    // <RelatedCardComponent key={key} listing={listing} history={history} currentUser={currentUser} />
    <ListingItemComponent
      key={key}
      history={history}
      item={listing}
      deleteProduct={onDelete}
      // currentUser={currentUser}
    />
  );
  const RenderListings = () => (
    <>
      <Row>
        <Col span={12}>
          <h2 className="headingTop">
            <Icon type="solution" /> &nbsp; My Listings
          </h2>
        </Col>
        <Col span={12} align="right">
          <Link to={`${ROUTES.add}`}>
            <Button type="primary">
              <Icon type="plus" /> Add
            </Button>
          </Link>
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      {/* <Divider style={{ margin: '5px 0px 10px' }} /> */}
      <SuggestedListComponent
        grid={{
          gutter: 24,
          sm: 1,
          md: 1,
          lg: 1
        }}
        {...props}
        items={listings}
        renderFunc={renderFunc}
      />
    </>
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

MyListingsView.propTypes = {
  listings: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.object
};

export default MyListingsView;

const NoListingsMessage = ({ t }) => <div align="center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
