import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, BackTop, Button, Tooltip } from 'antd';
import { enquireScreen } from 'enquire-js';

import NavBar from './NavBar';
import Footer from './Footer';

import styles from '../styles/index.less';


let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/',
      isMobile,
      show: true //!location.port, ToDo - find a better approach this
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen(b => {
      this.setState({ isMobile: !!b });
    });
    // ToDo - find a better approach for below statement
    // if (true) {

    setTimeout(() => {
      this.setState({
        show: true
      });
    }, 500);
    // }
  }
  render() {
    const { children, navBar, type, layoutType } = this.props;

    return (
      <Layout id="page-layout">
        {navBar !== false && <NavBar isMobile={this.state.isMobile} layoutType={layoutType} />}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
          {children}
        <BackTop>
          <Tooltip placement="left" title="Back to Top" autoAdjustOverflow={true}>
            <Button icon="arrow-up" type="primary" shape="circle-outline" size="large" />
          </Tooltip>
        </BackTop>
        <Footer />
      </Layout>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string
};

export default CoreLayout;
