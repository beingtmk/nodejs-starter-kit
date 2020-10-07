import React from 'react';
// import Helmet from 'react-helmet';

import { PageLayout } from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '@gqlapp/config';
import { enquireScreen } from 'enquire-js';

// import Banner0 from './AntdLanding/Banner0';
// import Content5 from './AntdLanding/Content5';
// import Feature0 from './AntdLanding/Feature0';
// import Feature3 from './AntdLanding/Feature3';
import DynamicCarousel from '../containers/DCComponents/DynamicCarouselComponent';
import ImageBanner from '../containers/DCComponents/ImageBannerComponent';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class HomeView4 extends React.Component {
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
    // const renderMetaData = t => (
    //   <Helmet
    //     title={`${settings.app.name} - ${t('title')}`}
    //     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    //   />
    // );
    const children = [
      <DynamicCarousel id="Banner_0" key="Banner_0" filter={{ label: LABEL[0] }} isMobile={this.state.isMobile} />,
      <ImageBanner id="Banner_1" key="Banner_1" filter={{ label: LABEL[1] }} isMobile={this.state.isMobile} />
      // <Banner0 id="Banner0_0" key="Banner0_0" isMobile={this.state.isMobile} />,
      // <Feature0 id="Feature0_0" key="Feature0_0" isMobile={this.state.isMobile} />,
      // <Content5 id="Content5_0" key="Content5_0" isMobile={this.state.isMobile} />,
      // <Feature3 id="Feature3_0" key="Feature3_0" isMobile={this.state.isMobile} />,
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
