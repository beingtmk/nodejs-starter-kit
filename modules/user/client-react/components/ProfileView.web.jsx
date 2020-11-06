import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import {
  Row,
  Col,
  Card,
  //  CardGroup,
  CardText,
  //  CardTitle,
  PageLayout,
  Heading,
  EditIcon,
  Icon,
  MetaTags,
  Divider,
  Spin as Loader
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ROUTES from '../routes';
import UserVerificationsComponent from './verification/UserVerificationsComponent';
import ProfileHeadComponent from './components/ProfileHeadComponent';
// import UsersCardComponent from './UsersCardComponent';
import AddressCardComponent from './components/AddressCardComponent';
import userCardData from '../helpers/userCardData';

// To Do Abstract Out

class ProfileView extends React.Component {
  getUserId = () => {
    let id = 0;
    if (this.props.match) {
      id = Number(this.props.match.params.id);
    } else if (this.props.navigation) {
      id = Number(this.props.navigation.state.params.id);
    }
    return id;
  };

  render() {
    const { t } = this.props;
    const { currentUser, currentUserLoading } = this.props;

    console.log('bleh', currentUser.profile && currentUser.profile);
    if (currentUserLoading && !currentUser) {
      return (
        <PageLayout select={ROUTES.profile}>
          <MetaTags title={t('profile.title')} description={t('profile.meta')} />
          <Loader text={t('profile.loadMsg')} />
        </PageLayout>
      );
    } else if (currentUser) {
      return (
        <PageLayout select={ROUTES.profile}>
          <MetaTags title={t('profile.title')} description={t('profile.meta')} />

          <Row gutter={5}>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
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
                  <Heading type="2">
                    <Icon type="UserOutlined" /> {t(`profile.card.title`)}
                  </Heading>
                  <div align="right" style={{ position: 'absolute', top: '0px', right: '10px' }}>
                    <Link to={`${ROUTES.editLink}${currentUser.id}`}>
                      <EditIcon />
                    </Link>
                  </div>
                </h2>

                <ProfileHeadComponent
                  profile={currentUser.profile && currentUser.profile}
                  description={userCardData(t, currentUser, this.getUserId()).profileHead}
                />
                <Divider />
                <Row type="flex" justify="space-around" align="middle">
                  <Col align="left" style={{ borderRight: '2px solid #23B195' }} span={12}>
                    <div>
                      <h2>
                        <Icon type="UserOutlined" /> {t('profile.card.group.name')}:
                      </h2>
                      <CardText>{currentUser.username}</CardText>
                    </div>
                    <div>
                      <h2>
                        <Icon type="SolutionOutlined" /> {t('profile.card.group.about')}:
                      </h2>

                      <CardText>
                        {currentUser.profile && currentUser.profile.about ? currentUser.profile.about : 'Not Provided'}
                      </CardText>
                    </div>

                    <div>
                      <h2>
                        <Icon type="TeamOutlined" />
                        {t('profile.card.group.role')}:
                      </h2>
                      <CardText>{currentUser.role ? currentUser.role : 'Not Provided'}</CardText>
                    </div>

                    {/* Portfolios */}
                    <h2>
                      <Icon type="PaperClipOutlined" /> {t('profile.card.group.portfolios.title')}
                    </h2>
                    {currentUser.portfolios && currentUser.portfolios.length !== 0
                      ? currentUser.portfolios.map((portfolio, key) => (
                          <div key={key}>
                            <CardText>
                              {portfolio.platform} : {portfolio.portfolioUrl}
                            </CardText>
                          </div>
                        ))
                      : 'Not Provided'}
                  </Col>
                  <Col align="right" span={12}>
                    <div>
                      <h2>
                        <Icon type="MailOutlined" /> {t('profile.card.group.email')}:
                      </h2>

                      <CardText>{currentUser.email ? currentUser.email : 'Not Provided'}</CardText>
                    </div>

                    <div>
                      <h2>
                        <Icon type="ShakeOutlined" /> Mobile
                      </h2>
                      <CardText>
                        {currentUser.profile && currentUser.profile.mobile
                          ? currentUser.profile.mobile
                          : 'Not Provided'}
                      </CardText>
                    </div>
                  </Col>
                </Row>
                <Divider />
                <h2>
                  <Icon type="ContactsOutlined" /> {t('profile.card.group.addresses.title')}
                </h2>
                <Row gutter={10}>
                  {currentUser.addresses && currentUser.addresses.length !== 0
                    ? currentUser.addresses.map((address, key) => (
                        <Col xs={{ span: 24 }} md={{ span: 12 }} key={key}>
                          <AddressCardComponent
                            address={address}
                            subTitle={t('profile.card.group.addresses.subTitle')}
                            index={key}
                          />
                        </Col>
                      ))
                    : 'Not Provided'}
                </Row>

                {/* Credit card info (Stripe subscription module)*/}
                {settings.stripe.subscription.enabled &&
                  settings.stripe.subscription.publicKey &&
                  currentUser.role === 'user' && <StripeSubscriptionProfile />}
              </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Row gutter={10} type="flex" justify="space-around" align="middle">
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 24 }} style={{ height: '100%' }}>
                  <UserVerificationsComponent
                    data={currentUser.verification}
                    verification={userCardData(t, currentUser, this.getUserId()).verification}
                  />
                </Col>
              </Row>
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
  currentUser: PropTypes.object,
  t: PropTypes.func,
  match: PropTypes.object,
  navigation: PropTypes.object
};
export default translate('user')(ProfileView);
