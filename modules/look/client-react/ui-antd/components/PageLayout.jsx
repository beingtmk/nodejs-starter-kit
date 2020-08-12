import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip } from "antd";
import { enquireScreen } from "enquire-js";
import CoreLayout from "./CoreLayout";

const layoutTypes = [
  {
    type: null,
    outerClassName: "content-layout",
    innerClassName: null,
  },
  {
    type: "home",
    outerClassName: "home-content-layout",
    innerClassName: null,
  },
  {
    type: "forms",
    outerClassName: "form-layout-outer",
    innerClassName: "form-content-layout",
  },
];

const { Content } = Layout;

class PageLayout extends React.Component {

  render() {
    const { children, navBar, type, footerType, noNavbar } = this.props;
    const contentStyle = layoutTypes.filter((item) => item.type === type);

    const renderContent = () => {
      return (
        <Content
          id="content"
          className={
            (contentStyle.length !== 0 && contentStyle[0].outerClassName) ||
            "content-layout"
          }
        >
          {children}
        </Content>
      );
    };
    return <CoreLayout layoutType='narrow' noNavbar={noNavbar} footerType={footerType}>{renderContent()}</CoreLayout>;
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string,
};

export default PageLayout;
