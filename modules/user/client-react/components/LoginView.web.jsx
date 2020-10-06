import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import {
  PageLayout,
  Card,
  CardGroup,
  CardTitle,
  CardText,
  Button,
  Icon,
  Row,
  Col,
} from "@gqlapp/look-client-react";
import { Typography } from "antd";
import settings from "@gqlapp/config";
import { NavLink } from "react-router-dom";

import LoginForm from "./LoginForm";

const { Title, Paragraph, Text } = Typography;

const LoginView = ({ onSubmit, t, isRegistered, hideModal }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t("login.title")}`}
      meta={[
        {
          name: "description",
          content: `${settings.app.name} - ${t("login.meta")}`,
        },
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: "center" }}>
        <CardTitle>{t("reg.successRegTitle")}</CardTitle>
        <CardText>{t("reg.successRegBody")}</CardText>
        <CardText>
          <Button
            style={{ minWidth: "320px" }}
            color="primary"
            onClick={hideModal}
          >
            {t("login.form.btnSubmit")}
          </Button>
        </CardText>
      </CardGroup>
    </Card>
  );

  const renderContent = () => (
    <>
      {isRegistered ? (
        renderConfirmationModal()
      ) : (
        <div className="auth-forms-page-right-wrapper">
          <div className="auth-forms-page-right">
            <LoginForm onSubmit={onSubmit} />
            <hr style={{ margin: "24px 0" }} />
            <Card>
              <CardGroup>
                <CardTitle>{t("login.cardTitle")}:</CardTitle>
                <CardText>admin@example.com:admin123</CardText>
                <CardText>user@example.com:user1234</CardText>
              </CardGroup>
            </Card>
          </div>
        </div>
      )}
    </>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData()}
      <div className="auth-form-wrapper">
        <Row
          style={{
            background: "white",
            boxShadow: "0px 4px 30px 20px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Col xs={"0"} lg={6} md={10} style={{ padding: "40px" }}>
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
              Welcome Back
            </Title>

            <div className="text-center" style={{ marginBottom: 16 }}>
              <p style={{ lineHeight: "58px" }} class="user-forms-text">
                {t("login.btn.notReg")}
              </p>
            </div>
            <NavLink
              className=""
              style={{margin:0}}
              to="/register"
              activeClassName="active"
            >
              <Button icon='user-add' type="primary" block>
                {t("login.btn.sign")}
              </Button>
            </NavLink>
          </Col>
          <Col lg={0} md={0} xs={24} style={{ padding: "24px" }}>
            <Title level={2} style={{ fontSize: "22px", fontWeight: "300" }}>
              Welcome Back
            </Title>

            <div className="text-center" style={{ marginBottom: 0 }}>
              <span style={{ lineHeight: "28px" }} class="user-forms-text">
                {t("login.btn.notReg")}
              </span>
              <NavLink
                className="btn btn-primary"
                to="/register"
                activeClassName="active"
                style={{ margin: 10 }}
              >
                {t("login.btn.sign")}
              </NavLink>
            </div>
          </Col>
          <Col lg={18} xs={24} md={14}>
            {renderContent()}
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
  isRegistered: PropTypes.bool,
  hideModal: PropTypes.func,
};

export default LoginView;
