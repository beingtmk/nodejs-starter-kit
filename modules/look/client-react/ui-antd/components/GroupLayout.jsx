import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip, Menu } from "antd";
import { enquireScreen } from "enquire-js";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/index.less";

const { Content, Sider } = Layout;

const ref = { modules: null };

export const onAppCreateGroupLayout = async (modules) =>
  (ref.modules = modules);

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class GroupLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "/",
      isMobile,
      show: true, //!location.port, ToDo - find a better approach this
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // ToDo - find a better approach for below statement
    // if (true) {

    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 500);
    // }
  }
  render() {
    const { children, siderMenu, navBar, type } = this.props;

    return (
      <Layout id="page-layout">
        {navBar !== false && (
          <NavBar isMobile={this.state.isMobile} layoutType={"wide"} />
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        <Layout className="group-layout-inner">
          <Sider width={200} className="group-layout-sider">
            {siderMenu}
          </Sider>
          <Layout style={{ marginLeft: "200px" }}>
            <Content className="group-layout-content">{children}</Content>
            <Footer />
          </Layout>
        </Layout>
        <BackTop>
          <Tooltip
            placement="left"
            title="Back to Top"
            autoAdjustOverflow={true}
          >
            <Button
              icon="arrow-up"
              type="primary"
              shape="circle-outline"
              size="large"
            />
          </Tooltip>
        </BackTop>
      </Layout>
    );
  }
}

GroupLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string,
};

export default GroupLayout;
