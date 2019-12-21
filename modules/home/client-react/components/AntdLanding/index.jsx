/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav3 from './Nav3';
import Banner1 from './Banner1';
import Banner4 from './Banner4';
import Banner3 from './Banner3';
import Banner2 from './Banner2';
import Banner5 from './Banner5';
import Content4 from './Content4';
import Content5 from './Content5';
import Content9 from './Content9';
import Content13 from './Content13';
import Content11 from './Content11';
import Content12 from './Content12';
import Contact0 from './Contact0';
import Feature1 from './Feature1';
import Feature2 from './Feature2';
import Feature6 from './Feature6';
import Feature0 from './Feature0';
import Feature7 from './Feature7';
import Feature3 from './Feature3';
import Feature4 from './Feature4';
import Feature5 from './Feature5';
import Feature8 from './Feature8';
import Pricing0 from './Pricing0';
import Pricing1 from './Pricing1';
import Pricing2 from './Pricing2';
import Teams0 from './Teams0';
import Teams2 from './Teams2';
import Teams1 from './Teams1';
import Teams3 from './Teams3';
import Teams4 from './Teams4';
import Footer1 from './Footer1';
import Footer2 from './Footer2';

import {
  Nav30DataSource,
  Banner10DataSource,
  Banner40DataSource,
  Banner30DataSource,
  Banner20DataSource,
  Banner50DataSource,
  Content40DataSource,
  Content50DataSource,
  Content90DataSource,
  Content130DataSource,
  Content91DataSource,
  Content131DataSource,
  Content110DataSource,
  Content120DataSource,
  Contact00DataSource,
  Feature10DataSource,
  Feature20DataSource,
  Feature60DataSource,
  Feature00DataSource,
  Feature70DataSource,
  Feature30DataSource,
  Feature40DataSource,
  Feature50DataSource,
  Feature80DataSource,
  Pricing00DataSource,
  Pricing10DataSource,
  Pricing20DataSource,
  Teams00DataSource,
  Teams20DataSource,
  Teams10DataSource,
  Teams30DataSource,
  Teams41DataSource,
  Footer10DataSource,
  Footer20DataSource,
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const children = [
      <Nav3
        id="Nav3_0"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner1
        id="Banner1_0"
        key="Banner1_0"
        dataSource={Banner10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner4
        id="Banner4_0"
        key="Banner4_0"
        dataSource={Banner40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner3
        id="Banner3_0"
        key="Banner3_0"
        dataSource={Banner30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner2
        id="Banner2_0"
        key="Banner2_0"
        dataSource={Banner20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner5
        id="Banner5_0"
        key="Banner5_0"
        dataSource={Banner50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content4
        id="Content4_0"
        key="Content4_0"
        dataSource={Content40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content5
        id="Content5_0"
        key="Content5_0"
        dataSource={Content50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content9
        id="Content9_0"
        key="Content9_0"
        dataSource={Content90DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content13
        id="Content13_0"
        key="Content13_0"
        dataSource={Content130DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content9
        id="Content9_1"
        key="Content9_1"
        dataSource={Content91DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content13
        id="Content13_1"
        key="Content13_1"
        dataSource={Content131DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content11
        id="Content11_0"
        key="Content11_0"
        dataSource={Content110DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content12
        id="Content12_0"
        key="Content12_0"
        dataSource={Content120DataSource}
        isMobile={this.state.isMobile}
      />,
      <Contact0
        id="Contact0_0"
        key="Contact0_0"
        dataSource={Contact00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature1
        id="Feature1_0"
        key="Feature1_0"
        dataSource={Feature10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature2
        id="Feature2_0"
        key="Feature2_0"
        dataSource={Feature20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature6
        id="Feature6_0"
        key="Feature6_0"
        dataSource={Feature60DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature0
        id="Feature0_0"
        key="Feature0_0"
        dataSource={Feature00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature7
        id="Feature7_0"
        key="Feature7_0"
        dataSource={Feature70DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature3
        id="Feature3_0"
        key="Feature3_0"
        dataSource={Feature30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature4
        id="Feature4_0"
        key="Feature4_0"
        dataSource={Feature40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature5
        id="Feature5_0"
        key="Feature5_0"
        dataSource={Feature50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature8
        id="Feature8_0"
        key="Feature8_0"
        dataSource={Feature80DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing0
        id="Pricing0_0"
        key="Pricing0_0"
        dataSource={Pricing00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing1
        id="Pricing1_0"
        key="Pricing1_0"
        dataSource={Pricing10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing2
        id="Pricing2_0"
        key="Pricing2_0"
        dataSource={Pricing20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams0
        id="Teams0_0"
        key="Teams0_0"
        dataSource={Teams00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams2
        id="Teams2_0"
        key="Teams2_0"
        dataSource={Teams20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams1
        id="Teams1_0"
        key="Teams1_0"
        dataSource={Teams10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams3
        id="Teams3_0"
        key="Teams3_0"
        dataSource={Teams30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams4
        id="Teams4_1"
        key="Teams4_1"
        dataSource={Teams41DataSource}
        isMobile={this.state.isMobile}
      />,
      <Footer1
        id="Footer1_0"
        key="Footer1_0"
        dataSource={Footer10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Footer2
        id="Footer2_0"
        key="Footer2_0"
        dataSource={Footer20DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
