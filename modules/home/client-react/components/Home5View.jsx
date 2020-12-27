import React from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';

import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import { LABEL } from '@gqlapp/home-common';

import BannerComponent from '../containers/DCComponents/BannerComponent';

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
    const { t } = this.props;
    const children = [
      <BannerComponent
        id="Banner_0"
        key="Banner_0"
        filter={{ label: LABEL[2], isActive: true }}
        isMobile={this.state.isMobile}
        {...this.props}
      />
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
