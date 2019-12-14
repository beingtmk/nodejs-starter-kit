import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import NavBar from './NavBar';

import styles from '../styles/styles.less';

const { Header, Content } = Layout;

class PageLayout extends React.Component {
  render() {
    const { children, navBar } = this.props;

    return (
      <Layout>
        {navBar !== false && (
          <Header className="no-print">
            <NavBar />
          </Header>
        )}
        {__SERVER__ && __DEV__ && (
          <Helmet>
            <style type="text/css">{styles._getCss()}</style>
          </Helmet>
        )}
        <Content id="content" style={{ background: '#fff', padding: 0 }}>
          {children}
        </Content>
      </Layout>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
