import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import { Card, PageLayout } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Icon } from 'antd';

import UserListings from '@gqlapp/listing-client-react/containers/UserListings';
import ProfileHeadComponent from './components/ProfileHeadComponent';
import userCardData from '../helpers/userCardData';
import settings from '../../../../settings';

class ProfileView extends React.Component {
  getUserId = () => {
    let id = 0;
    if (this.props.match) {
      id = this.props.match.params.id;
    } else if (this.props.navigation) {
      id = this.props.navigation.state.params.id;
    }
    return id;
  };
  renderMetaData = t => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('profile.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('profile.meta')}`
          }
        ]}
      />
    );
  };

  render() {
    const { t, user } = this.props;
    const { profile } = user.user;
    console.log('bleh', profile && profile);
    if (profile) {
      return (
        <PageLayout select="/profile">
          {this.renderMetaData(t)}

          <Row gutter={5}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Card style={{ display: 'block' }}>
                <h2
                  style={{
                    fontSize: '23px',
                    fontWeight: 'bold',
                    height: '61px',
                    marginBottom: '0px',
                    position: 'relative'
                  }}
                >
                  <Icon type="user" /> {user.user.username}
                </h2>
                <ProfileHeadComponent
                  profile={profile && profile}
                  description={userCardData(t, user, this.getUserId()).profileHead}
                />
                <Divider />
                <UserListings user={user.user} />
              </Card>
            </Col>
          </Row>
        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          {this.renderMetaData(t)}
          <h2>{t('profile.errorMsg')}</h2>
        </PageLayout>
      );
    }
  }
}

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  match: PropTypes.object,
  navigation: PropTypes.object
};
export default translate('user')(ProfileView);
