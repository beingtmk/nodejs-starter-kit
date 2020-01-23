import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, BackTop, Button, Tooltip } from 'antd';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import { enquireScreen } from 'enquire-js';

import NavBar from './NavBar';
import Footer from './Footer';

import styles from '../styles/index.less';

const { Header, Content } = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class PageLayout extends React.Component {
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
    const { children, navBar, type } = this.props;
    const contentStyle = type === 'home' ? 'home-content-layout' : 'content-layout';
    return (
      <Layout id="page-layout">
        {navBar !== false && (
          <ScrollParallax
            location="page-layout"
            className="navbar-parallex"
            animation={{ playScale: [1, 1.1], translateY: this.state.isMobile ? '' : '-40px' }}
          >
            <Header className="no-print">
              <NavBar isMobile={this.state.isMobile} />
            </Header>{' '}
          </ScrollParallax>
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        <Content id="content" className={contentStyle}>
          {children}
        </Content>
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

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  type: PropTypes.string
};

export default PageLayout;
