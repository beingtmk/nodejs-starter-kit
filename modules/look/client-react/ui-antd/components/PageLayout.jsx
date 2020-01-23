import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, BackTop, Button, Tooltip } from 'antd';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

import NavBar from './NavBar';

import styles from '../styles/styles.less';

const { Header, Content } = Layout;

class PageLayout extends React.Component {
  render() {
    const { children, navBar, type } = this.props;
    const contentStyle = type === 'home' ? 'home-content-layout' : 'content-layout';
    return (
      <Layout id="page-layout">
        {navBar !== false && (
          <ScrollParallax
            location="page-layout"
            className="navbar-parallex"
            animation={{ playScale: [1, 1.5], translateY: '-40px' }}
          >
            <Header className="no-print">
              <NavBar />
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
