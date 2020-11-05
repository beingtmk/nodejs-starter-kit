import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Icon,
  Row,
  Col,
  PageLayout,
  Heading,
  MetaTags,
  Empty,
  Button,
  SuggestedListComponent,
  Spinner
} from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';
import ROUTES from '../routes';
import ListingItemComponent from './ListingItemComponent';

const MyListingsView = props => {
  const { listings, loading, onDelete, history, t } = props;

  const renderFunc = (key, listing) => (
    <ListingItemComponent
      t={t}
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
        grid={{
          gutter: 24,
          xs: 1,
          md: 1,
          lg: 1,
          xxl: 1
        }}
        {...props}
        items={listings}
        renderFunc={renderFunc}
      />
    </>
  );
  return (
    <PageLayout>
      <MetaTags title={t('myListings.title')} description={`${settings.app.name} - ${t('myListings.title')})}`} />

      {loading && <Spinner />}
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

const NoListingsMessage = ({ t }) => (
  <div align="center">
    <br />
    <br />
    <Empty description={t('listing.noListingsMsg')}>
      <Link to={`${ROUTES.add}`}>
        <Button color="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);
NoListingsMessage.propTypes = { t: PropTypes.func };
