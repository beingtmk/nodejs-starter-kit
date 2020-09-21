import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import { translate } from "@gqlapp/i18n-client-react";
import {
  PageLayout,
  Card,
  CardGroup,
  Icon,
  CardTitle,
  CardText,
} from "@gqlapp/look-client-react";

import { Typography, Row, Col } from "antd";
import { NavLink } from "react-router-dom";

import settings from "@gqlapp/config";

import RegisterForm from "./RegisterForm";

const { Title, Paragraph, Text } = Typography;

const RegisterView = ({ t, onSubmit, isRegistered }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("reg.title")}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("reg.meta")}`,
        },
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: "center" }}>
        <CardTitle>{t("reg.confirmationMsgTitle")}</CardTitle>
        <CardText>{t("reg.confirmationMsgBody")}</CardText>
      </CardGroup>
    </Card>
  );

  const renderContent = () => (
    <div className="auth-forms-page-right-wrapper">
      <div className="auth-forms-page-right">
        {isRegistered && settings.auth.password.requireEmailConfirmation ? (
          renderConfirmationModal()
        ) : (
          <RegisterForm onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData(t)}
      <div
        className='auth-form-wrapper'
      >
        <Row
          style={{
            background: "white",
            boxShadow: "0px 4px 30px 20px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Col lg={6} md={10} xs={0} style={{ padding: "40px" }}>
            <img
              src="https://res.cloudinary.com/approxyma/image/upload/v1597225742/Brainayan-Unleash-Unrealized-Potential_gligmg.png"
              // height="46px"
              width="100px"
              alt=""
            />
            <Title
              level={2}
              style={{ marginTop: "80px", fontSize: "28px", fontWeight: "300" }}
            >
              Create your account
            </Title>

            <div className="text-center" style={{ marginBottom: 16 }}>
              <span style={{ lineHeight: "58px" }} class="user-forms-text">
                Already a user
              </span>
              <NavLink
                className="btn btn-primary"
                to="/login"
                activeClassName="active"
                style={{ margin: 10 }}
              >
                sign In
              </NavLink>
            </div>
          </Col>
          <Col lg={0} md={0} xs={24} style={{ padding: "24px" }}>
            <Title
              level={2}
              style={{ fontSize: "22px", fontWeight: "300" }}
            >
              Create your account
            </Title>

            <div className="text-center" style={{ marginBottom: 0 }}>
              <span style={{ lineHeight: "28px" }} class="user-forms-text">
                Already a user
              </span>
              <NavLink
                className="btn btn-primary"
                to="/login"
                activeClassName="active"
                style={{ margin: 10 }}
              >
                sign In
              </NavLink>
            </div>
          </Col>
          <Col lg={18} xs={24} md={14}>{renderContent()}</Col>
        </Row>
      </div>
    </PageLayout>
  );
};

RegisterView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  isRegistered: PropTypes.bool,
};

export default translate("user")(RegisterView);
