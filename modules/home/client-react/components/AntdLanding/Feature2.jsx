import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { translate } from '@gqlapp/i18n-client-react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from '@gqlapp/look-client-react';

function Content2(props) {
  const { t, ...tagProps } = props;
  const { isMobile } = tagProps;
  const Feature20DataSource = {
    wrapper: { className: 'home-page-wrapper content2-wrapper' },
    OverPack: { className: 'home-page content2', playScale: 0.3 },
    imgWrapper: { className: 'content2-img', md: 10, xs: 24 },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/tvQTfCupGUFKSfQ.png'
    },
    textWrapper: { className: 'content2-text', md: 14, xs: 24 },
    title: { className: 'content2-title', children: t('feature2.textWrapper.title') },
    content: {
      className: 'content2-content',
      children: t('feature2.textWrapper.content')
    }
  };
  const dataSource = Feature20DataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'left',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
      : {
          x: '+=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
  };
  const img = (
    <TweenOne
      key="img"
      animation={animType.one}
      resetStyle
      {...dataSource.imgWrapper}
      component={Col}
      componentProps={{
        md: dataSource.imgWrapper.md,
        xs: dataSource.imgWrapper.xs
      }}
    >
      <span {...dataSource.img}>
        <img src={dataSource.img.children} width="100%" alt="img" />
      </span>
    </TweenOne>
  );
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack} component={Row}>
        {isMobile && img}
        <QueueAnim
          type={animType.queue}
          key="text"
          leaveReverse
          ease={['easeOutCubic', 'easeInCubic']}
          {...dataSource.textWrapper}
          component={Col}
          componentProps={{
            md: dataSource.textWrapper.md,
            xs: dataSource.textWrapper.xs
          }}
        >
          <h2 key="h1" {...dataSource.title}>
            {dataSource.title.children}
          </h2>
          <div key="p" {...dataSource.content}>
            {dataSource.content.children}
          </div>
        </QueueAnim>
        {!isMobile && img}
      </OverPack>
    </div>
  );
}
Content2.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content2);
