import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { translate } from '@gqlapp/i18n-client-react';
import { Row, Col } from '@gqlapp/look-client-react';

import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

function Content1(props) {
  const { t, ...tagProps } = props;
  const { isMobile } = tagProps;
  const Feature10DataSource = {
    wrapper: { className: 'home-page-wrapper content1-wrapper' },
    OverPack: { className: 'home-page content1', playScale: 0.3 },
    imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
    img: {
      children: 'https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png'
    },
    textWrapper: { className: 'content1-text', md: 14, xs: 24 },
    title: { className: 'content1-title', children: t('feature1.textWrapper.title') },
    content: {
      className: 'content1-content',
      children: t('feature1.textWrapper.content')
    }
  };
  const dataSource = Feature10DataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
      : {
          x: '-=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad'
        }
  };
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack} component={Row}>
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
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
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
      </OverPack>
    </div>
  );
}
Content1.propTypes = {
  t: PropTypes.func
};
export default translate('home')(Content1);
