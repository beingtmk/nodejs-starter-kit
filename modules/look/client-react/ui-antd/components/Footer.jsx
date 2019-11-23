import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import settings from '@gqlapp/config';

const { Footer } = Layout;

class PageLayout extends React.Component {
  render() {
    return (
      <Footer className="no-print" style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()}. {settings.app.name}.
      </Footer>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
