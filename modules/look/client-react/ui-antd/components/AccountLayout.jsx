import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout, BackTop, Button, Tooltip, Menu, Icon } from "antd";
import { enquireScreen } from "enquire-js";
// import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import MenuItem from "./MenuItem";
// import { GroupDashBoardSider } from "./GroupDashBoardSider";
import styles from "../styles/index.less";

const { Content, Sider } = Layout;

const ref = { modules: null };
export const onAppCreateAccountLayout = async (modules) => (ref.modules = modules);

const AccountMenu = (props)=>{
  console.log('AccountMenu', props);
  const { path } = props;
    return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={path}
        // className="navbar-menu"
      >
        {ref.modules.navItemsUser}
      </Menu>
    );
}


let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class AccountLayout extends React.Component {
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
    const { children, navBar, type, path } = this.props;
    console.log('AccountLayout', this.props);
    return (
      <Layout id="page-layout">
        {navBar !== false && (
          <NavBar
            isMobile={this.state.isMobile}
            layoutType={"wide"}
            leftSiderComponent={<AccountMenu  path={path} />}
          />
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        <Layout className="wide-layout-inner">
          <Sider width={200} className="wide-layout-sider">
          <AccountMenu  path={path} />
          </Sider>
          <Layout className="wide-layout-content-wrapper">
            <Content className="wide-layout-content">{children}</Content>
          </Layout>
        </Layout>
        <Footer />
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

AccountLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string,
};

export default AccountLayout;
