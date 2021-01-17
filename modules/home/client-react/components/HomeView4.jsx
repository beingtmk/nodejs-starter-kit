import React from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';

import { compose } from '@gqlapp/core-common';
import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import { LABEL } from '@gqlapp/home-common';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { DiscountsCarousel } from '@gqlapp/discount-client-react';
import { ListingCarousel } from '@gqlapp/listing-client-react';
import DynamicCarousel from '../containers/DCComponents/DynamicCarouselComponent';
import ImageBanner from '../containers/DCComponents/ImageBannerComponent';
// import Banner0 from './AntdLanding/Banner0';
// import Content5 from './AntdLanding/Content5';
// import Feature0 from './AntdLanding/Feature0';
// import Feature3 from './AntdLanding/Feature3';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class HomeView4 extends React.Component {
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
    const { history, currentUser, t } = this.props;
    const children = [
      <DynamicCarousel
        id="Banner_0"
        key="Banner_0"
        filter={{ label: LABEL[0], isActive: true }}
        isMobile={this.state.isMobile}
        {...this.props}
      />,
      <ImageBanner
        t={t}
        id="Banner_1"
        key="Banner_1"
        filter={{ label: LABEL[1], isActive: true }}
        isMobile={this.state.isMobile}
        {...this.props}
        style={{ backgroundColor: '#f7f7f7' }}
      />,
      <ListingCarousel
        filter={{ isFeatured: true, isActive: true }}
        onFilter={c => c.node.listingFlags.isFeatured === true}
        currentUser={currentUser}
        title={t('listingCarousel.featuredListings')}
        history={history}
        {...this.props}
      />,
      <ListingCarousel
        filter={{ isNew: true, isActive: true }}
        onFilter={c => c.node.listingFlags.isNew === true}
        currentUser={currentUser}
        title={t('listingCarousel.latestAdditions')}
        history={history}
        {...this.props}
        style={{ backgroundColor: '#f7f7f7' }}
      />,
      <DiscountsCarousel
        filter={{ isActive: true, isDiscount: true, onGoing: true }}
        orderBy={{ order: 'asc', column: 'discountDuration.endDate' }}
        currentUser={currentUser}
        title={t('discountsCarousel.onGoing')}
        history={history}
        {...this.props}
        OnGoingDiscounts
      />,
      <DiscountsCarousel
        filter={{ isActive: true, isDiscount: true, upComing: true }}
        orderBy={{ order: 'asc', column: 'discountDuration.startDate' }}
        currentUser={currentUser}
        title={t('discountsCarousel.upComing')}
        history={history}
        {...this.props}
        OnGoingDiscounts
        style={{ backgroundColor: '#f7f7f7' }}
      />
      // <Banner0 id="Banner0_0" key="Banner0_0" isMobile={this.state.isMobile} />,
      // <Feature0 id="Feature0_0" key="Feature0_0" isMobile={this.state.isMobile} />,
      // <Content5 id="Content5_0" key="Content5_0" isMobile={this.state.isMobile} />,
      // <Feature3 id="Feature3_0" key="Feature3_0" isMobile={this.state.isMobile} />,
    ];

    // console.log(this.props);
    return (
      <PageLayout type="home">
        <MetaTags title={t('title')} description={t('welcomeText')} />

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

HomeView4.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func
};

export default compose(withCurrentUser)(HomeView4);
