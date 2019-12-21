import React from 'react';
// import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '@gqlapp/config';
import { enquireScreen } from 'enquire-js';

import Banner1 from './AntdLanding/Banner1';
import Banner4 from './AntdLanding/Banner4';
import Banner3 from './AntdLanding/Banner3';
import Banner2 from './AntdLanding/Banner2';
import Banner5 from './AntdLanding/Banner5';
import Content4 from './AntdLanding/Content4';
import Content5 from './AntdLanding/Content5';
import Content9 from './AntdLanding/Content9';
import Content13 from './AntdLanding/Content13';
import Content11 from './AntdLanding/Content11';
import Content12 from './AntdLanding/Content12';
import Contact0 from './AntdLanding/Contact0';
import Feature1 from './AntdLanding/Feature1';
import Feature2 from './AntdLanding/Feature2';
import Feature6 from './AntdLanding/Feature6';
import Feature0 from './AntdLanding/Feature0';
import Feature7 from './AntdLanding/Feature7';
import Feature3 from './AntdLanding/Feature3';
import Feature4 from './AntdLanding/Feature4';
import Feature5 from './AntdLanding/Feature5';
import Feature8 from './AntdLanding/Feature8';
import Pricing0 from './AntdLanding/Pricing0';
import Pricing1 from './AntdLanding/Pricing1';
import Pricing2 from './AntdLanding/Pricing2';
import Teams0 from './AntdLanding/Teams0';
import Teams2 from './AntdLanding/Teams2';
import Teams1 from './AntdLanding/Teams1';
import Teams3 from './AntdLanding/Teams3';
import Teams4 from './AntdLanding/Teams4';
import Footer1 from './AntdLanding/Footer1';
import Footer2 from './AntdLanding/Footer2';

import {
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
  Footer20DataSource
} from './AntdLanding/data.source';
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
      show: true //!location.port, ToDo - find a better approach for below statement
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
      <Banner1 id="Banner1_0" key="Banner1_0" dataSource={Banner10DataSource} isMobile={this.state.isMobile} />,
      <Banner4 id="Banner4_0" key="Banner4_0" dataSource={Banner40DataSource} isMobile={this.state.isMobile} />,
      <Banner3 id="Banner3_0" key="Banner3_0" dataSource={Banner30DataSource} isMobile={this.state.isMobile} />,
      <Banner2 id="Banner2_0" key="Banner2_0" dataSource={Banner20DataSource} isMobile={this.state.isMobile} />,
      <Banner5 id="Banner5_0" key="Banner5_0" dataSource={Banner50DataSource} isMobile={this.state.isMobile} />,
      <Content4 id="Content4_0" key="Content4_0" dataSource={Content40DataSource} isMobile={this.state.isMobile} />,
      <Content5 id="Content5_0" key="Content5_0" dataSource={Content50DataSource} isMobile={this.state.isMobile} />,
      <Content9 id="Content9_0" key="Content9_0" dataSource={Content90DataSource} isMobile={this.state.isMobile} />,
      <Content13 id="Content13_0" key="Content13_0" dataSource={Content130DataSource} isMobile={this.state.isMobile} />,
      <Content9 id="Content9_1" key="Content9_1" dataSource={Content91DataSource} isMobile={this.state.isMobile} />,
      <Content13 id="Content13_1" key="Content13_1" dataSource={Content131DataSource} isMobile={this.state.isMobile} />,
      <Content11 id="Content11_0" key="Content11_0" dataSource={Content110DataSource} isMobile={this.state.isMobile} />,
      <Content12 id="Content12_0" key="Content12_0" dataSource={Content120DataSource} isMobile={this.state.isMobile} />,
      <Contact0 id="Contact0_0" key="Contact0_0" dataSource={Contact00DataSource} isMobile={this.state.isMobile} />,
      <Feature1 id="Feature1_0" key="Feature1_0" dataSource={Feature10DataSource} isMobile={this.state.isMobile} />,
      <Feature2 id="Feature2_0" key="Feature2_0" dataSource={Feature20DataSource} isMobile={this.state.isMobile} />,
      <Feature6 id="Feature6_0" key="Feature6_0" dataSource={Feature60DataSource} isMobile={this.state.isMobile} />,
      <Feature0 id="Feature0_0" key="Feature0_0" dataSource={Feature00DataSource} isMobile={this.state.isMobile} />,
      <Feature7 id="Feature7_0" key="Feature7_0" dataSource={Feature70DataSource} isMobile={this.state.isMobile} />,
      <Feature3 id="Feature3_0" key="Feature3_0" dataSource={Feature30DataSource} isMobile={this.state.isMobile} />,
      <Feature4 id="Feature4_0" key="Feature4_0" dataSource={Feature40DataSource} isMobile={this.state.isMobile} />,
      <Feature5 id="Feature5_0" key="Feature5_0" dataSource={Feature50DataSource} isMobile={this.state.isMobile} />,
      <Feature8 id="Feature8_0" key="Feature8_0" dataSource={Feature80DataSource} isMobile={this.state.isMobile} />,
      <Pricing0 id="Pricing0_0" key="Pricing0_0" dataSource={Pricing00DataSource} isMobile={this.state.isMobile} />,
      <Pricing1 id="Pricing1_0" key="Pricing1_0" dataSource={Pricing10DataSource} isMobile={this.state.isMobile} />,
      <Pricing2 id="Pricing2_0" key="Pricing2_0" dataSource={Pricing20DataSource} isMobile={this.state.isMobile} />,
      <Teams0 id="Teams0_0" key="Teams0_0" dataSource={Teams00DataSource} isMobile={this.state.isMobile} />,
      <Teams2 id="Teams2_0" key="Teams2_0" dataSource={Teams20DataSource} isMobile={this.state.isMobile} />,
      <Teams1 id="Teams1_0" key="Teams1_0" dataSource={Teams10DataSource} isMobile={this.state.isMobile} />,
      <Teams3 id="Teams3_0" key="Teams3_0" dataSource={Teams30DataSource} isMobile={this.state.isMobile} />,
      <Teams4 id="Teams4_1" key="Teams4_1" dataSource={Teams41DataSource} isMobile={this.state.isMobile} />,
      <Footer1 id="Footer1_0" key="Footer1_0" dataSource={Footer10DataSource} isMobile={this.state.isMobile} />,
      <Footer2 id="Footer2_0" key="Footer2_0" dataSource={Footer20DataSource} isMobile={this.state.isMobile} />
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
