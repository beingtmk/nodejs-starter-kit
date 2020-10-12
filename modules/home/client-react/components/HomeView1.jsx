import React from 'react';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { enquireScreen } from 'enquire-js';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import settings from '@gqlapp/config';
import Banner0 from './AntdLanding/Banner0';

import Content5 from './AntdLanding/Content5';

import Feature0 from './AntdLanding/Feature0';

import Feature3 from './AntdLanding/Feature3';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.props);
    const { t } = this.props;
    const children = [
      <Banner0 id="Banner0_0" key="Banner0_0" isMobile={this.state.isMobile} />,
      <Feature0 id="Feature0_0" key="Feature0_0" isMobile={this.state.isMobile} />,
      <Content5 id="Content5_0" key="Content5_0" isMobile={this.state.isMobile} />,
      <Feature3 id="Feature3_0" key="Feature3_0" isMobile={this.state.isMobile} />
    ];
    return (
      <PageLayout type="home">
        <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

        <div
          className="templates-wrapper"
          ref={d => {
            this.dom = d;
          }}
        >
          {/* 如果不是 dva 2.0 替换成 {children} start */}
          {this.state.show && children}
          {/* 如果不是 dva 2.0 替换成 {children} end */}
        </div>
      </PageLayout>
    );
  }
}
HomeView.propTypes = {
  t: PropTypes.func
};

export default translate('home')(HomeView);
