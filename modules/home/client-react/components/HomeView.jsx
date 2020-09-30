import React from 'react';
// import Helmet from 'react-helmet';


import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '@gqlapp/config';
import { enquireScreen } from 'enquire-js';

import ProBanner from './components/ProBanner';


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
    // const renderMetaData = t => (
    //   <Helmet
    //     title={`${settings.app.name} - ${t('title')}`}
    //     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    //   />
    // );
    const children = [
      <ProBanner id="ProBanner_0" key="ProBanner_0" isMobile={this.state.isMobile} />,
      
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
