import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { Pagination, PageLayout, CatalogueWithInfiniteScroll } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Button, Spin } from 'antd';
import ProfileCatalogueCard from './components/ProfileCatalogueCard';
import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => (
  <div style={{ minHeight: '20vh', paddingTop: '10vh' }} align="center">
    {/* <Loader text={'Loading'} /> */}
    <Spin />
  </div>
);
Loading.propTypes = { t: PropTypes.func };

const NoUserMessage = ({ t }) => (
  <h2 className="text-center" style={{ textAlign: 'center' }}>
    No users to show
  </h2>
);
NoUserMessage.propTypes = { t: PropTypes.func };
class UsersProfileCatalogueView extends Component {
  render() {
    const { loading, users, t, loadData } = this.props;

    const RenderUserList = () => (
      <Fragment>
        <div>
          <UsersProfileListComponent {...this.props} />
        </div>
      </Fragment>
    );

    return (
      <PageLayout>
        {/* Render metadata */}
        <Helmet
          title={`${settings.app.name} - Users List`}
          meta={[
            {
              name: 'description',
              content: `${settings.app.name} - ${t('user.meta')}`
            }
          ]}
        />
        <h2 className="profile-catalogue-heading" style={{ fontSize: '32px', marginBottom: '24px' }}>
          <strong>All Users</strong>

          <div key="line" className="title-line-wrapper" align="left">
            <div
              className="title-line"
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
        </h2>
        <Row gutter={24}>
          <Col xs={24} md={18}>
            {/* Render loader */}
            {loading && <Spin t={t} />}
            {/* Render main listing content */}
            {users && users.totalCount ? <RenderUserList /> : !loading ? <NoUserMessage t={t} /> : null}
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

UsersProfileCatalogueView.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  loadData: PropTypes.func,
  t: PropTypes.func,
  toggleWatchList: PropTypes.func,
  currentUser: PropTypes.object,
  watchlist: PropTypes.array
};

class UsersProfileListComponent extends Component {
  render() {
    return (
      <div>
        <div>
          <CatalogueWithInfiniteScroll
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3
            }}
            endMessage={'End Of Profiles'}
            loadData={this.props.loadData}
            component={ProfileCatalogueCard}
            list={this.props.users}
            loading={this.props.loading}
            hasMore={this.props.users.pageInfo.hasNextPage}
            endCursor={this.props.users.pageInfo.endCursor}
            totalCount={this.props.users.totalCount}
          />
        </div>
      </div>
    );
  }
}

UsersProfileListComponent.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default translate('listing')(UsersProfileCatalogueView);
