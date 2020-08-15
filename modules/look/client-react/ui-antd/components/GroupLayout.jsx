import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip, Menu, Icon } from "antd";
import { enquireScreen } from "enquire-js";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
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
    const { children, id, navBar, type, path } = this.props;
    console.log('GroupLayoutLayout', this.props);
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
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={path}
              // className="navbar-menu"
            >
              <MenuItem key="/group/:id/info">
                <NavLink to={`/group/${id}/info`}>
                  <Icon type="file-text" />
                  Info
                </NavLink>
              </MenuItem>

              <MenuItem key="/group/:id/members">
                <NavLink to={`/group/${id}/members`}>
                  <Icon type="team" />
                  Members
                </NavLink>
              </MenuItem>

              <MenuItem key="/group/:id/quiz-report">
                <NavLink to={`/group/${id}/quiz-report`}>
                  <Icon type="bar-chart" />
                  Quiz Report
                </NavLink>
              </MenuItem>
            </Menu>
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
