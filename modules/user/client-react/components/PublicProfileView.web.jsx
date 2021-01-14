import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Icon, Card, MetaTags, PageLayout, Row, Col, Divider } from '@gqlapp/look-client-react';
import { USER_ROUTES } from '@gqlapp/user-client-react';

import ProfileHeadComponent from './components/ProfileHeadComponent';
import userCardData from '../helpers/userCardData';

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

  render() {
    const { t } = this.props;
    const user = this.props.user;
    const { profile } = user && user.user;

    if (profile) {
      return (
        <PageLayout select={`${USER_ROUTES.profile}`}>
          <MetaTags title={t('profile.title')} description={t('profile.meta')} />

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
                  <Icon type="UserOutlined" /> {user.user.username}
                </h2>
                <ProfileHeadComponent
                  profile={profile && profile}
                  description={userCardData(t, user, this.getUserId()).profileHead}
                />
                <Divider />
                {/* <UserListings user={user.user} history={history} /> */}
              </Card>
            </Col>
          </Row>
        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          <MetaTags title={t('profile.title')} description={t('profile.meta')} />

          <h2>{t('profile.errorMsg')}</h2>
        </PageLayout>
      );
    }
  }
}

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  t: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object
};
export default translate('user')(ProfileView);
