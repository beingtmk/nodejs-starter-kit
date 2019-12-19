import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import NavBar from './NavBar';

import styles from '../styles/styles.less';

const { Header, Content } = Layout;

class PageLayout extends React.Component {
  render() {
    const { children, navBar, type } = this.props;
    const style = type === 'home' ? {  padding: 0, marginTop: '-50px' } : {  padding: '24px', margin: 0 };
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
        <Content id="content" style={style}>
          {children}
        </Content>
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
