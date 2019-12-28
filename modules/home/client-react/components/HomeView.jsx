import React from 'react';
// import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '@gqlapp/config';
import { enquireScreen } from 'enquire-js';

import Banner0 from './AntdLanding/Banner0';

import Content5 from './AntdLanding/Content5';

import Feature0 from './AntdLanding/Feature0';

import Feature3 from './AntdLanding/Feature3';

import Footer1 from './AntdLanding/Footer1';

import './AntdLanding/less/antMotionStyle.less';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class HomeView extends React.Component {
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
    // const renderMetaData = t => (
    //   <Helmet
    //     title={`${settings.app.name} - ${t('title')}`}
    //     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    //   />
    // );
    const children = [
      <Banner0 id="Banner0_0" key="Banner0_0" isMobile={this.state.isMobile} />,
      <Feature0 id="Feature0_0" key="Feature0_0" isMobile={this.state.isMobile} />,
      <Content5 id="Content5_0" key="Content5_0" isMobile={this.state.isMobile} />,
      <Feature3 id="Feature3_0" key="Feature3_0" isMobile={this.state.isMobile} />,

      <Footer1 id="Footer1_0" key="Footer1_0" isMobile={this.state.isMobile} />
    ];
    return (
      <PageLayout type="home">
        {/* {renderMetaData(this.props.t)} */}
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
