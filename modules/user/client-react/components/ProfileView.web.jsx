import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { StripeSubscriptionProfile } from "@gqlapp/payments-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Card,
  //  CardGroup,
  CardText,
  //  CardTitle,
} from "@gqlapp/look-client-react";
import AccountLayout from "@gqlapp/look-client-react/ui-antd/components/AccountLayout";
import { Row, Col, Divider, Icon, Button, Spin as Loader } from "antd";
// import UserVerificationsComponent from './verification/UserVerificationsComponent';
import ProfileHeadComponent from "./components/ProfileHeadComponent";
// import UsersCardComponent from './UsersCardComponent';
import settings from "../../../../settings";
import AddressCardComponent from "./components/AddressCardComponent";
import userCardData from "../helpers/userCardData";

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
    const renderMetaData = (t) => {
      return (
        <Helmet
          title={`${settings.app.name} - ${t("profile.title")}`}
          meta={[
            {
              name: "description",
              content: `${settings.app.name} - ${t("profile.meta")}`,
            },
          ]}
        />
      );
    };
    const { t } = this.props;
    const { currentUser, currentUserLoading, match } = this.props;

    if (currentUserLoading && !currentUser) {
      return (
        <AccountLayout select="/profile" path={match && match.path}>
          {renderMetaData(t)}
          <Loader text={t("profile.loadMsg")} />
        </AccountLayout>
      );
    } else if (currentUser) {
      return (
        <AccountLayout select="/profile" path={match && match.path}>
          {renderMetaData(t)}

          <Row gutter={5}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <h2
                  style={{
                    fontSize: "23px",
                    fontWeight: "bold",
                    height: "61px",
                    marginBottom: "0px",
                    position: "relative",
                  }}
                >
                  <Icon type="user" /> My Profile
                  <div
                    align="right"
                    style={{ position: "absolute", top: "0px", right: "10px" }}
                  >
                    <Link to={`/users/${currentUser.id}`}>
                      <Button shape="circle" size="large">
                        <Icon type="edit" />
                      </Button>
                    </Link>
                  </div>
                </h2>

                <ProfileHeadComponent
                  userId={this.getUserId() || currentUser.id}
                  profile={currentUser && currentUser.profile}
                />{console.log('ProfileHeadHeadHead', currentUser)}
                <Divider />
                <Row type="flex" justify="space-around" align="middle">
                  <Col
                    align="left"
                    style={{ borderRight: "2px solid #23B195" }}
                    span={12}
                  >
                    <div>
                      <h2>
                        <Icon type="user" /> {t("profile.card.group.name")}:
                      </h2>
                      <CardText>{currentUser.username}</CardText>
                    </div>
                    

                    <div>
                      <h2>
                        <Icon type="team" /> {t("profile.card.group.role")}:
                      </h2>

                      <CardText>
                        {currentUser.role ? currentUser.role : "Not Provided"}
                      </CardText>
                    </div>

                    
                  </Col>
                  <Col align="right" span={12}>
                    <div>
                      <h2>
                        <Icon type="mail" /> {t("profile.card.group.email")}:
                      </h2>

                      <CardText>
                        {currentUser.email ? currentUser.email : "Not Provided"}
                      </CardText>
                    </div>

                    
                  </Col>
                </Row>
                <Divider />
                

                {/* Credit card info (Stripe subscription module)*/}
                {settings.stripe.subscription.enabled &&
                  settings.stripe.subscription.publicKey &&
                  currentUser.role === "user" && <StripeSubscriptionProfile />}
            </Col>
            {/* <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Row gutter={10} type="flex" justify="space-around" align="middle">
                
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 24 }} style={{ height: '100%' }}>
                  <UserVerificationsComponent
                    data={currentUser.verification}
                    verification={userCardData(t, currentUser, this.getUserId()).verification}
                  />
                </Col>
              </Row>
            </Col> */}
          </Row>
        </AccountLayout>
      );
    } else {
      return (
        <AccountLayout path={match && match.path}>
          {renderMetaData(t)}
          <h2>{t("profile.errorMsg")}</h2>
        </AccountLayout>
      );
    }
  }
}

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func,
  match: PropTypes.object,
  navigation: PropTypes.object,
};
export default translate("user")(ProfileView);
