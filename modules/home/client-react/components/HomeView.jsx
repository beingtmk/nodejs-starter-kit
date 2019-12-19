import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { enquireScreen } from 'enquire-js';

import Banner0 from './Banner0';
import Content0 from './Content0';
import Content1 from './Content1';
import Content3 from './Content3';
import Footer0 from './Footer0';

import {
  Nav00DataSource,
  Banner00DataSource,
  Content00DataSource,
  Content10DataSource,
  Content30DataSource,
  Footer00DataSource
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

try {
  const { location } = window;
} catch (oError) {
  console.log(oError);
}

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: true //!location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen(b => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    console.log(this.props);
    const renderMetaData = t => (
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
      />
    );
    const children = [
      <Banner0 id="Banner0_0" key="Banner0_0" dataSource={Banner00DataSource} isMobile={this.state.isMobile} />,
      <Content0 id="Content0_0" key="Content0_0" dataSource={Content00DataSource} isMobile={this.state.isMobile} />,
      <Content1 id="Content1_0" key="Content1_0" dataSource={Content10DataSource} isMobile={this.state.isMobile} />,
      <Content3 id="Content3_0" key="Content3_0" dataSource={Content30DataSource} isMobile={this.state.isMobile} />,
      <Footer0 id="Footer0_0" key="Footer0_0" dataSource={Footer00DataSource} isMobile={this.state.isMobile} />
    ];
    return (
      <PageLayout type='home'>
        {renderMetaData(this.props.t)}
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
}};



