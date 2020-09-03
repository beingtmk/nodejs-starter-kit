import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip, Menu, Icon } from "antd";
import { enquireScreen } from "enquire-js";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import { GroupDashBoardSider } from "./GroupDashBoardSider";
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
    console.log("GroupLayoutLayout", this.props);

    
    return (
      <Layout id="page-layout">
        {navBar !== false && (
          <NavBar
            isMobile={this.state.isMobile}
            layoutType={"wide"}
            leftSiderComponent={<GroupDashBoardSider id={id} path={path} />}
          />
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        <Layout className="group-layout-inner">
          <Sider width={200} className="group-layout-sider">
            <GroupDashBoardSider id={id} path={path} />
          </Sider>
          <Layout className="group-layout-content-wrapper">
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
