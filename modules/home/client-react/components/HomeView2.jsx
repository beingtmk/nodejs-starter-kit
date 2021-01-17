import React from 'react';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { enquireScreen } from 'enquire-js';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';

import settings from '@gqlapp/config';
import Banner5 from './AntdLanding/Banner5';
import Feature6 from './AntdLanding/Feature6';
import Feature0 from './AntdLanding/Feature0';
import Feature7 from './AntdLanding/Feature7';
import Feature8 from './AntdLanding/Feature8';

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
      <Banner5 id="Banner5_0" key="Banner5_0" isMobile={this.state.isMobile} />,
      <Feature6 id="Feature6_0" key="Feature6_0" isMobile={this.state.isMobile} />,
      <Feature7 id="Feature7_0" key="Feature7_0" isMobile={this.state.isMobile} />,
      <Feature0 id="Feature0_0" key="Feature0_0" isMobile={this.state.isMobile} />,
      <Feature8 id="Feature8_0" key="Feature8_0" isMobile={this.state.isMobile} />
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
