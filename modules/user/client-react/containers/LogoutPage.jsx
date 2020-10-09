import React from "react";
import PropTypes from "prop-types";
import { Result, Button, Icon } from "antd";

import { PageLayout } from "@gqlapp/look-client-react";

const LogoutPage = (props) => {
  return (
    <PageLayout type="forms">
      <div
      >
        <Result
          
          icon={
            <img
              src="https://res.cloudinary.com/approxyma/image/upload/v1601452372/DangerousSociableGalago_drjy9s.webp"
              height="150px"
            />
          }
          status="success"
          title="Successfully Logged Out"
          subTitle="Hey awesome manager, it was a pleasure having you here. And see you again soon!"
          extra={[
            <Button href="/" type="primary" key="console">
              <Icon type="home" /> Go to Home
            </Button>,
            <Button key="buy" href="/login">
              <Icon type="login" />
              SignIn
            </Button>,
          ]}
        />
      </div>
    </PageLayout>
  );
};

LogoutPage.propTypes = {};

export default LogoutPage;
