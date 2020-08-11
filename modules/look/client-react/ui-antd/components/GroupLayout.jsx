import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip, Menu } from "antd";
import { enquireScreen } from "enquire-js";
import CoreLayout from "./CoreLayout";

const { Content, Sider } = Layout;

const ref = { modules: null };

export const onAppCreateGroupLayout = async (modules) =>
  (ref.modules = modules);

class GroupLayout extends React.Component {
  render() {
    const { children, siderMenu } = this.props;

    const renderContent = () => {
      return (
        <Layout className="group-layout-inner">
          <Sider width={200} style={{ background: "#fff", paddingTop:'24px' }}>
            {siderMenu}
          </Sider>
          <Layout>
            <Content className="group-layout-content">{children}</Content>
          </Layout>
        </Layout>
      );
    };
    return <CoreLayout layoutType='wide'>{renderContent()}</CoreLayout>;
  }
}

GroupLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string,
};

export default GroupLayout;
